from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

from app.routers import analyze, movies, analytics

app = FastAPI(
    title="Intelligent Movie Review Platform API",
    description="Production ML & Aspect-Based Sentiment Analysis Platform for Cinema Reviews",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Robust CORS configuration for local development and cloud production (Vercel, Render)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach Modular Routers
app.include_router(analyze.router)
app.include_router(movies.router)
app.include_router(analytics.router)

@app.get("/")
async def root():
    return {
        "name": "Intelligent Movie Review Platform API",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "analyze_single": "POST /api/analyze",
            "analyze_batch": "POST /api/analyze/batch",
            "movie_catalog": "GET /api/movies",
            "movie_detail": "GET /api/movies/{movie_id}",
            "analytics_dashboard": "GET /api/analytics",
            "health_check": "GET /api/health"
        },
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "model_engine": "loaded",
        "aspect_ontology_count": 5,
        "environment": "production-ready",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
