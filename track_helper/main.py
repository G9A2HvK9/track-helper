from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from track_helper.routes import youtube  # Import YouTube API routes

app = FastAPI()

# ✅ CORS Middleware - Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this if your frontend is deployed elsewhere
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    """Root route to check if API is running."""
    return {"message": "Hello from FastAPI!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    """Example dynamic endpoint."""
    return {"item_id": item_id, "query": q}

# ✅ Register YouTube API routes
app.include_router(youtube.router, prefix="/api")
