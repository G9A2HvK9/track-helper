import requests
import os
from urllib.parse import quote
from track_helper.config import load_dotenv

load_dotenv()

DISCOGS_API_KEY = os.getenv("DISCOGS_API_KEY")
DISCOGS_API_URL = "https://api.discogs.com/database/search"

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

    if "results" in data and len(data["results"]) > 0:
        top_result = data["results"][0]
        return top_result.get("uri")  # Return Discogs URL of the top result

    return None  # No match found
