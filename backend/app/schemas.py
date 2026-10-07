from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class ReviewRequest(BaseModel):
    text: str = Field(..., min_length=3, description="Movie review text to analyze")
    movie_title: Optional[str] = Field(None, description="Optional movie title for contextual evaluation")
    include_aspects: Optional[bool] = Field(True, description="Whether to extract aspect-level sentiment")

class MovieGenerateRequest(BaseModel):
    movie_title: str = Field(..., min_length=1, description="Movie title to generate an intelligent review for")
    perspective: Optional[str] = Field("consensus", description="Perspective: consensus, acclaim, mixed, critique")

class MovieMetadata(BaseModel):
    director: str
    year: int
    genres: List[str]
    poster_url: str
    is_curated: bool

class AspectScore(BaseModel):
    aspect: str
    sentiment: str  # Positive, Neutral, Negative
    score: float    # 0.0 to 1.0 (or normalized percentage 0 - 100)
    confidence: float
    evidence: str

class SentimentProbabilities(BaseModel):
    positive: float
    neutral: float
    negative: float

class HighlightedToken(BaseModel):
    text: str
    tag: str  # 'positive', 'negative', 'aspect', 'neutral'
    weight: Optional[float] = 0.0

class ReviewAnalysisResponse(BaseModel):
    id: str
    text: str
    movie_title: Optional[str] = None
    sentiment: str  # 'Positive', 'Neutral', 'Negative'
    confidence: float
    compound_score: float
    overall_rating: float  # Scale 1.0 - 10.0
    probabilities: SentimentProbabilities
    aspects: List[AspectScore]
    summary: str
    highlighted_tokens: List[HighlightedToken]
    processing_time_ms: float

class MovieGenerateResponse(BaseModel):
    movie_title: str
    metadata: MovieMetadata
    perspective: str
    review_text: str
    analysis: ReviewAnalysisResponse

class BatchReviewRequest(BaseModel):
    reviews: List[ReviewRequest]

class BatchReviewResponse(BaseModel):
    total_analyzed: int
    results: List[ReviewAnalysisResponse]
    overall_sentiment_distribution: Dict[str, int]
    average_confidence: float
    aspect_averages: Dict[str, float]

class SampleReview(BaseModel):
    id: str
    author: str
    publication: Optional[str] = None
    is_critic: bool
    rating: float
    date: str
    text: str
    sentiment: str
    aspect_highlights: Dict[str, str]

class Movie(BaseModel):
    id: str
    title: str
    year: int
    director: str
    cast: List[str]
    genres: List[str]
    runtime: str
    poster_url: str
    backdrop_url: str
    synopsis: str
    critic_score: float  # e.g., 94%
    audience_score: float  # e.g., 91%
    overall_sentiment: str
    sentiment_distribution: Dict[str, float]
    aspect_scores: Dict[str, float]
    reviews_count: int
    recent_reviews: List[SampleReview]

class AnalyticsKPIs(BaseModel):
    total_reviews_analyzed: int
    avg_sentiment_polarity: float
    overall_positive_rate: float
    critic_audience_concordance: float
    dominant_aspect: str

class AnalyticsResponse(BaseModel):
    kpis: AnalyticsKPIs
    sentiment_distribution: List[Dict[str, Any]]
    rating_distribution: List[Dict[str, Any]]
    sentiment_trends: List[Dict[str, Any]]
    aspect_breakdown: List[Dict[str, Any]]
    critic_vs_audience: List[Dict[str, Any]]
    top_positive_keywords: List[Dict[str, Any]]
    top_negative_keywords: List[Dict[str, Any]]
