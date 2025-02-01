import re

def split_title(title: str):
    """Splits a video title into track and artist based on the ' - ' separator.
    
    - Assumes format: "Artist - Track Title"
    - If no dash found, assumes the entire title is the track name.
    
    Returns:
    {
        "artist": "Artist Name",
        "track": "Track Title"
    }
    """
    parts = title.split(" - ", 1)  # Split only at the first dash
    
    if len(parts) == 2:
        artist, track = parts
    else:
        artist, track = "Unknown", title  # Fallback if no dash is found

    return {"artist": artist.strip(), "track": track.strip()}
