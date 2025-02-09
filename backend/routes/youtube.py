from fastapi import APIRouter, Query
from backend.services.youtube_service import get_playlist_id, get_playlist_videos

router = APIRouter()

@router.get("/playlist")
def fetch_playlist_videos(playlist_url: str = Query(..., title="YouTube Playlist URL")):
    """Fetches videos from a YouTube playlist URL."""
    playlist_id = get_playlist_id(playlist_url)  # Extract Playlist ID
    
    if not playlist_id:
        return {"error": "Invalid playlist URL"}
    
    videos = get_playlist_videos(playlist_id)  # Fetch videos using extracted Playlist ID
    
    return {"playlist_id": playlist_id, "videos": videos}

