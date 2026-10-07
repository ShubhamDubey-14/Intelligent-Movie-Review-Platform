from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import numpy as np

from app.schemas import (
    ReviewRequest,
    ReviewAnalysisResponse,
    BatchReviewRequest,
    BatchReviewResponse,
    MovieGenerateRequest,
    MovieGenerateResponse
)
from app.model import engine
from app.generator import generate_intelligent_review

router = APIRouter(prefix="/api/analyze", tags=["ML Analysis Engine"])

@router.post("/generate", response_model=MovieGenerateResponse)
async def generate_and_analyze_movie_review(payload: MovieGenerateRequest):
    """
    Intelligently generates a multi-dimensional cinematic review for ANY movie title
    and analyzes it via the ML Sentiment & ABSA Engine.
    """
    if not payload.movie_title or not payload.movie_title.strip():
        raise HTTPException(status_code=400, detail="Movie title cannot be empty.")

    synth = generate_intelligent_review(
        movie_title=payload.movie_title,
        perspective=payload.perspective or "consensus"
    )

    analysis = engine.predict(
        text=synth["review_text"],
        movie_title=synth["title"]
    )

    return {
        "movie_title": synth["title"],
        "metadata": {
            "director": synth["director"],
            "year": synth["year"],
            "genres": synth["genres"],
            "poster_url": synth["poster_url"],
            "is_curated": synth["is_curated"]
        },
        "perspective": synth["perspective"],
        "review_text": synth["review_text"],
        "analysis": analysis
    }

@router.post("", response_model=ReviewAnalysisResponse)
async def analyze_single_review(payload: ReviewRequest):
    """
    Analyze a single movie review using the ML & ABSA engine.
    Extracts overall sentiment, confidence, probability distribution,
    aspect-based sentiment breakdown, and key sentiment tokens.
    """
    if not payload.text or len(payload.text.strip()) < 3:
        raise HTTPException(status_code=400, detail="Review text must be at least 3 characters long.")

    result = engine.predict(text=payload.text, movie_title=payload.movie_title)
    return result

@router.post("/batch", response_model=BatchReviewResponse)
async def analyze_batch_reviews(payload: BatchReviewRequest):
    """
    Analyze multiple movie reviews in a single batch request.
    Calculates aggregated metrics and aspect averages across all submissions.
    """
    if not payload.reviews:
        raise HTTPException(status_code=400, detail="Reviews list cannot be empty.")

    results = []
    sentiment_counts = {"Positive": 0, "Neutral": 0, "Negative": 0}
    confidences = []
    aspect_scores_agg: Dict[str, list] = {}

    for req in payload.reviews:
        res = engine.predict(text=req.text, movie_title=req.movie_title)
        results.append(res)
        sentiment_counts[res["sentiment"]] = sentiment_counts.get(res["sentiment"], 0) + 1
        confidences.append(res["confidence"])

        for asp in res["aspects"]:
            aspect_name = asp["aspect"]
            aspect_scores_agg.setdefault(aspect_name, []).append(asp["score"])

    aspect_averages = {
        name: round(float(np.mean(scores)), 2)
        for name, scores in aspect_scores_agg.items()
    }

    return {
        "total_analyzed": len(results),
        "results": results,
        "overall_sentiment_distribution": sentiment_counts,
        "average_confidence": round(float(np.mean(confidences)), 2) if confidences else 0.0,
        "aspect_averages": aspect_averages
    }
