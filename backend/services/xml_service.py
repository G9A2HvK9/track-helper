import xml.etree.ElementTree as ET
from sqlalchemy.orm import Session
from backend.data.models import OwnedMusicLossless
import os

def parse_rekordbox_xml(file_path: str, db: Session):
    """
    Parse a Rekordbox XML file and insert track data into the database.
    """
    if not os.path.exists(file_path):
        print(f"❌ Error: File not found at {file_path}")
        return

    try:
        print(f"🔍 Parsing XML file: {file_path}")
        tree = ET.parse(file_path)
        root = tree.getroot()

        collection = root.find("./COLLECTION")
        if collection is None:
            print("❌ No COLLECTION element found.")
            return

        track_count = 0
        for track in collection.findall("./TRACK"):
            track_id = track.get("TrackID")
            name = track.get("Name")
            artist = track.get("Artist")
            location = track.get("Location")
            location = location.replace("file://localhost", "") if location else "Unknown"

            # Log the track details
            #print(f"🎵 TrackID={track_id}, Name={name}, Artist={artist}, Location={location}")

            # Ensure critical attributes are present
            if not track_id or not name or not location:
                print(f"⚠️ Skipping track with missing data: TrackID={track_id}, Name={name}, Location={location}")
                continue

            # Check if the track already exists in the database
            existing_track = db.query(OwnedMusicLossless).filter(OwnedMusicLossless.track_id == track_id).first()
            print(f"🔍 Query result for TrackID={track_id}: {existing_track}")
            if not existing_track:
                new_track = OwnedMusicLossless(
                    artist=artist,
                    name=name,
                    track_id=track_id,
                    tags=[]  # No tags yet
                )
                db.add(new_track)
                track_count += 1
                print(f"✅ Track added: {new_track}")
            else:
                print(f"🔄 Track already exists: TrackID={track_id}")

        db.commit()
        print(f"📦 Database commit completed. {track_count} new tracks added.")
    
    except Exception as e:
        db.rollback()
        print(f"❌ Error during XML parsing or database commit: {e}")
