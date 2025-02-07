import json
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import youtube
from sqlalchemy.orm import Session
from backend.database import engine, Base, get_db
from backend.data.models import Tag, OwnedMusic, UnownedMusic
from sqlalchemy.sql import text

app = FastAPI()

# ✅ CORS Middleware - Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# ✅ Initialize DB
def load_tags_from_config(file_path="data/tags.json"):
    with open(file_path, "r") as f:
        data = json.load(f)
    return data.get("tags", [])

def insert_tags_from_config(db: Session, tags: list):
    existing_tags = {tag.name for tag in db.query(Tag).all()}
    for tag_name in tags:
        if tag_name not in existing_tags:
            tag = Tag(name=tag_name)
            db.add(tag)
    db.commit()

@app.on_event("startup")
def startup_db():
    print("🚀 Initializing database and creating tables if they don't exist...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables verified.")

    tags = load_tags_from_config()
    with Session(bind=engine) as db:
        insert_tags_from_config(db, tags)

    # ✅ Verify that tables exist
    with engine.connect() as connection:
        result = connection.execute(text("SELECT name FROM sqlite_master WHERE type='table';"))
        tables = [row[0] for row in result]
        print(f"📂 Existing tables: {tables}")

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

# ✅ Register YouTube API routes
app.include_router(youtube.router, prefix="/api")
