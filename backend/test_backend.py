import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["model_engine"] == "loaded"

def test_analyze_positive_review():
    payload = {
        "text": "An absolute cinematic masterpiece with breathtaking visuals and flawless performances.",
        "movie_title": "Oppenheimer"
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["sentiment"] == "Positive"
    assert data["confidence"] > 0.6
    assert data["overall_rating"] >= 7.0
    assert len(data["aspects"]) > 0

def test_analyze_negative_review():
    payload = {
        "text": "A disjointed, tedious mess with terrible dialogue and wooden acting.",
        "movie_title": "Generic Flop"
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["sentiment"] == "Negative"
    assert data["confidence"] > 0.6
    assert data["overall_rating"] <= 4.0

def test_analyze_contrastive_review():
    payload = {
        "text": "Although the cinematography and visual effects were breathtaking, the plot was hollow and the acting was disappointing."
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    aspect_map = {a["aspect"]: a["sentiment"] for a in data["aspects"]}
    assert aspect_map.get("Cinematography & Visuals") == "Positive"
    assert aspect_map.get("Story & Screenplay") == "Negative"
    assert aspect_map.get("Acting & Cast") == "Negative"

def test_get_movies_catalog():
    response = client.get("/api/movies")
    assert response.status_code == 200
    movies = response.json()
    assert len(movies) >= 10
    assert movies[0]["title"] is not None

def test_filter_movies():
    response = client.get("/api/movies?genre=Sci-Fi")
    assert response.status_code == 200
    movies = response.json()
    for m in movies:
        assert "Sci-Fi" in m["genres"]

def test_get_analytics():
    response = client.get("/api/analytics")
    assert response.status_code == 200
    data = response.json()
    assert "kpis" in data
    assert "sentiment_distribution" in data
    assert "sentiment_trends" in data
    assert "aspect_breakdown" in data
    assert "critic_vs_audience" in data

def test_generate_movie_review():
    payload = {
        "movie_title": "Inception",
        "perspective": "acclaim"
    }
    response = client.post("/api/analyze/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["movie_title"] == "Inception"
    assert "Christopher Nolan" in data["metadata"]["director"]
    assert len(data["review_text"]) > 20
    assert data["analysis"]["sentiment"] == "Positive"
    assert len(data["analysis"]["aspects"]) > 0

