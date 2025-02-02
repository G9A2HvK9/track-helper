import requests
import os
from track_helper.config import BEATPORT_API_URL, BEATPORT_BASE_URL, BEATPORT_CLIENT_ID, BEATPORT_CLIENT_SECRET

def get_access_token():
    """Fetches an access token from the Beatport API."""
    data = {
        "client_id": BEATPORT_CLIENT_ID,
        "client_secret": BEATPORT_CLIENT_SECRET,
        "grant_type": "client_credentials",
    }
    
    response = requests.post(TOKEN_URL, data=data)
    token_data = response.json()

    if "access_token" in token_data:
        return token_data["access_token"]

    return None  # Handle error cases


def search_beatport(artist, track):
    """Searches Beatport for a track and returns the top result URL."""
    
    if not artist or not track:
        return None  # Skip if artist or track is missing

    access_token = get_access_token()
    if not access_token:
        return None  # Cannot authenticate, return None

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    search_url = f"{BEATPORT_API_URL}/catalog/tracks/"
    params = {
        "q": f"{artist} {track}"
    }

    response = requests.get(search_url, headers=headers, params=params)
    data = response.json()

    # ✅ Ensure results exist before accessing them
    if "results" in data and len(data["results"]) > 0:
        top_result = data["results"][0]
        track_id = top_result.get("id")  # Get Beatport Track ID

        if track_id:
            return f"https://www.beatport.com/track/{track_id}"  # ✅ Return full Beatport URL

    return None  # ✅ No results found
