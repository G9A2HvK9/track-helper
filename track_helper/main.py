from fastapi import FastAPI
from track_helper.routes import youtube  # Import the YouTube API routes

app = FastAPI()

@app.get("/")
def read_root():
    """Root route to check if the API is running."""
    return {"message": "Hello from Poetry & FastAPI!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    """Example dynamic endpoint."""
    return {"item_id": item_id, "query": q}

# Register all API routes
app.include_router(youtube.router, prefix="/api")
