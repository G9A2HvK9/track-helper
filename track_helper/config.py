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

## Beatport API
BEATPORT_BASE_URL = "https://www.beatport.com" # Base Beatport URL
BEATPORT_API_URL = "https://api.beatport.com/v4/" # Beatport API URL
BEATPORT_CLIENT_ID = os.getenv("BEATPORT_CLIENT_ID", "your-default-client-id") # Load client ID from .env
BEATPORT_CLIENT_SECRET = os.getenv("BEATPORT_CLIENT_SECRET", "your-dault-client-secret") # Load client secret from .env