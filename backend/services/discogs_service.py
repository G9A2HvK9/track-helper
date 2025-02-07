import requests
import os
from urllib.parse import quote
from backend.config import DISCOGS_BASE_URL, DISCOGS_API_URL, DISCOGS_API_KEY

def search_discogs(artist, track):
    """Searches Discogs for a track and returns the top result URL."""
    
    if not artist or not track:
        return None  # Skip if artist or track is missing

    query = f"{artist} {track}"
    params = {
        "q": query,
        "type": "release",
        "token": DISCOGS_API_KEY  # Auth using API key
    }

    response = requests.get(DISCOGS_API_URL, params=params)
    data = response.json()

    # Ensure results exist before accessing them
    if "results" in data and len(data["results"]) > 0:
        top_result = data["results"][0]
        discogs_path = top_result.get("uri", None)  # Ensure it's None-safe

        if discogs_path:  # Only return if `discogs_path` exists
            return f"{DISCOGS_BASE_URL}{discogs_path}"

    return None  # No results found
