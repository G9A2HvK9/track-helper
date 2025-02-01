import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Global constants

## YouTube API
YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3"
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "your-default-api-key")  # Load from .env
DEFAULT_MAX_RESULTS = 50  # Default pagination size

## Discogs API
DISCOGS_BASE_URL = "https://www.discogs.com"  # Base Discogs URL
DISCOGS_API_URL = "https://api.discogs.com/database/search"
DISCOGS_API_KEY = os.getenv("DISCOGS_API_KEY", "your-default-api-key") # Load from .env