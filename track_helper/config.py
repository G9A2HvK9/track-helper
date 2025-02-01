import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Global constants

## YouTube API
YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3"
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "your-default-api-key")  # Load from .env
DEFAULT_MAX_RESULTS = 50  # Default pagination size
