from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional, Dict, Any
import copy

from app.schemas import Movie, ReviewRequest
from app.dataset import SAMPLE_MOVIES
from app.model import engine

router = APIRouter(prefix="/api/movies", tags=["Movie Catalog"])

# In-memory working copy to allow adding reviews dynamically during session
_movies_database = copy.deepcopy(SAMPLE_MOVIES)

@router.get("", response_model=List[Dict[str, Any]])
async def get_movies(
    search: Optional[str] = Query(None, description="Search term for title or director"),
    genre: Optional[str] = Query(None, description="Filter by genre (e.g. Sci-Fi, Drama)"),
    sentiment: Optional[str] = Query(None, description="Filter by sentiment (Positive, Neutral, Negative)"),
    min_rating: Optional[float] = Query(None, description="Minimum audience rating"),
    sort_by: Optional[str] = Query("audience_desc", description="Sort by: audience_desc, critic_desc, year_desc, title_asc")
):
    """
    Retrieve list of sample movies with pre-analyzed review scores.
    Supports search, filtering by genre/sentiment/rating, and sorting.
    """
    filtered = list(_movies_database)

    # Search filter
    if search:
        s = search.lower().strip()
        filtered = [
            m for m in filtered
            if s in m["title"].lower() or s in m["director"].lower() or any(s in c.lower() for c in m["cast"])
        ]

    # Genre filter
    if genre and genre.lower() != "all":
        g = genre.lower()
        filtered = [m for m in filtered if any(g == item.lower() for item in m["genres"])]

    # Sentiment filter
    if sentiment and sentiment.lower() != "all":
        s_target = sentiment.lower()
        filtered = [m for m in filtered if m["overall_sentiment"].lower() == s_target]

    # Minimum rating filter
    if min_rating is not None:
        filtered = [m for m in filtered if m["audience_score"] >= min_rating]

    # Sorting
    if sort_by == "audience_desc":
        filtered.sort(key=lambda m: m["audience_score"], reverse=True)
    elif sort_by == "critic_desc":
        filtered.sort(key=lambda m: m["critic_score"], reverse=True)
    elif sort_by == "year_desc":
        filtered.sort(key=lambda m: m["year"], reverse=True)
    elif sort_by == "title_asc":
        filtered.sort(key=lambda m: m["title"])

    return filtered

@router.get("/{movie_id}", response_model=Dict[str, Any])
async def get_movie_by_id(movie_id: str):
    """Retrieve full movie details, aspect breakdowns, and review catalogue."""
    for m in _movies_database:
        if m["id"] == movie_id:
            return m
    raise HTTPException(status_code=404, detail=f"Movie with ID '{movie_id}' not found.")

@router.post("/{movie_id}/reviews")
async def add_review_to_movie(movie_id: str, payload: ReviewRequest):
    """
    Add a new review to a specific movie, running real-time ML sentiment analysis
    and updating the movie's review catalog.
    """
    target = None
    for m in _movies_database:
        if m["id"] == movie_id:
            target = m
            break

    if not target:
        raise HTTPException(status_code=404, detail=f"Movie with ID '{movie_id}' not found.")

    analysis = engine.predict(payload.text, movie_title=target["title"])

    new_review_entry = {
        "id": analysis["id"],
        "author": "Verified Viewer",
        "publication": None,
        "is_critic": False,
        "rating": analysis["overall_rating"],
        "date": "Just now",
        "text": payload.text,
        "sentiment": analysis["sentiment"],
        "aspect_highlights": {
            a["aspect"]: a["evidence"][:60] for a in analysis["aspects"]
        }
    }

    target["recent_reviews"].insert(0, new_review_entry)
    target["reviews_count"] += 1

    return {
        "message": "Review analyzed and registered successfully.",
        "analysis": analysis,
        "movie_id": movie_id
    }
