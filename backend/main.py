import json
import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import xml, youtube
from backend.database import engine, Base, get_db, SessionLocal
from backend.data.models import Tag, OwnedMusicLossless, OwnedMusicCompressed, UnownedMusic
from sqlalchemy.sql import text
import logging

app = FastAPI()

# ✅ Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ✅ CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load tags from JSON
def load_tags_from_config(file_path="data/tags.json"):
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        return data.get("tags", [])
    except Exception as e:
        logger.error(f"Failed to load tags from {file_path}: {e}")
        return []

def insert_tags_from_config(db: SessionLocal, tags: list):
    existing_tags = {tag.name for tag in db.query(Tag).all()}
    for tag_name in tags:
        if tag_name not in existing_tags:
            tag = Tag(name=tag_name)
            db.add(tag)
    db.commit()

@app.on_event("startup")
def startup_db():
    logger.info("🚀 Initializing database and creating tables if they don't exist...")
    # ✅ Ensure all tables are created
    Base.metadata.create_all(bind=engine)
    
    # ✅ Check if the local.db file exists
    if os.path.exists("./local.db"):
        logger.info("📂 local.db found.")
    else:
        logger.error("❌ local.db not found. Database may not be properly configured.")

    # ✅ Check existing tables in the database
    with engine.connect() as connection:
        result = connection.execute(text("SELECT name FROM sqlite_master WHERE type='table';"))
        tables = [row[0] for row in result]
        logger.info(f"📂 Existing tables: {tables}")

    # ✅ Insert tags from the config file
    tags = load_tags_from_config()
    with SessionLocal() as db:
        insert_tags_from_config(db, tags)
        db_result = db.execute(text("PRAGMA database_list;")).fetchall()
        logger.info(f"🔍 Connected databases: {db_result}")

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

# ✅ Register YouTube and XML API routes with unique prefixes
app.include_router(youtube.router, prefix="/api/youtube")
app.include_router(xml.router, prefix="/api/xml")
