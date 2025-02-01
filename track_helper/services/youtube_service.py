import requests
import logging
from urllib.parse import urlparse, parse_qs
from track_helper.config import YOUTUBE_API_BASE_URL, YOUTUBE_API_KEY, DEFAULT_MAX_RESULTS
from track_helper.utils.formatting import split_title
from track_helper.services.discogs_service import search_discogs  # Import Discogs search



# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)

def get_playlist_id(url: str) -> str:
    """Extracts the playlist ID from a YouTube playlist URL."""
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    return query_params.get("list", [None])[0]

def get_playlist_videos(playlist_id: str):
    """Fetches videos from a YouTube playlist using the YouTube Data API."""
    videos = []
    next_page_token = None

    while True:
        params = {
            "part": "snippet",
            "maxResults": DEFAULT_MAX_RESULTS,
            "playlistId": playlist_id,
            "key": YOUTUBE_API_KEY,
        }

        if next_page_token:
            params["pageToken"] = next_page_token

        #logging.debug(f"Fetching playlist videos from: {YOUTUBE_API_BASE_URL}/playlistItems with params: {params}")
        
        response = requests.get(f"{YOUTUBE_API_BASE_URL}/playlistItems", params=params)
        data = response.json()

        # Log the raw API response for debugging
        #logging.debug(f"YouTube API response: {data}")

        if "items" in data:
            for item in data["items"]:
                video_title = item["snippet"]["title"]
                video_id = item["snippet"]["resourceId"]["videoId"]

                formatted_title = split_title(video_title)
                artist = formatted_title["artist"]
                track = formatted_title["track"]

                discogs_url = search_discogs(artist, track)  # Search Discogs

                videos.append({
                    "title": video_title,
                    "formatted": formatted_title,
                    "url": f"https://www.youtube.com/watch?v={video_id}",
                    "discogs": discogs_url  # ✅ Append Discogs result
                })


        next_page_token = data.get("nextPageToken")

        if not next_page_token:
            break

    return videos
