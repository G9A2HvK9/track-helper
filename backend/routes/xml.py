from fastapi import APIRouter, UploadFile, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from services.xml_service import parse_rekordbox_xml  # Adjusted import for xml_service
from database import get_db
import shutil

router = APIRouter()

@router.post("/upload")
async def upload_xml(file: UploadFile, db: Session = Depends(get_db)):
    temp_file_path = f"./temp_{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = db.execute(text("PRAGMA database_list;")).fetchall()
    print(f"🔍 Connected databases during upload: {result}")
    
    result = db.execute(text("SELECT name FROM sqlite_master WHERE type='table';")).fetchall()
    print(f"📂 Tables in the current session: {result}")

    parse_rekordbox_xml(temp_file_path, db)  # Call the XML parser service

    return {"message": "File uploaded and processed successfully"}
