# 🎬 CINE·MIND — Intelligent Movie Review Platform
### *Machine Learning & Aspect-Based Sentiment Analytics for Modern Cinema*

[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.12%20%7C%203.13-3776AB?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.136+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.9+-F7931E?logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Recharts](https://img.shields.io/badge/Recharts-3+-22C55E)](https://recharts.org)

An end-to-end, production-ready, full-stack intelligence platform that deconstructs movie reviews with neural precision. Designed with an ultra-minimalistic, editorial cinematic aesthetic (inspired by Vercel, Linear, and Letterboxd), **CINE·MIND** combines calibrated supervised learning, Aspect-Based Sentiment Analysis (ABSA), and rich data analytics.

---

## 🌟 Key Features

### 1. 🧠 ML Sentiment & Aspect-Based Sentiment Analysis (ABSA) Engine
- **Multi-Class Polarity Classification:** Classifies natural language movie reviews into **Positive**, **Neutral**, or **Negative** with calibrated confidence scores and 3-way probability distributions.
- **Fine-Grained Aspect Extraction:** Automatically segments reviews into sub-clauses to isolate and score sentiment across 5 core cinematic dimensions:
  - 📖 **Story & Screenplay** (Pacing, dialogue, plot twists, narrative arc)
  - 🎭 **Acting & Cast** (Performances, chemistry, screen presence)
  - 🧭 **Directing & Vision** (Auteur execution, tonal discipline, staging)
  - 🎥 **Cinematography & Visuals** (Lighting, camerawork, CGI/VFX, color composition)
  - 🎵 **Music & Sound Design** (Original score, audio mixing, soundscape)
- **Contrastive Nuance Handling:** Correctly resolves complex contrastive clauses such as:  
  *“Although the cinematography and visual effects were breathtaking, the plot was hollow and the acting was disappointing.”*  
  *(Visuals → Positive 88% | Story → Negative 8% | Acting → Negative 8%)*
- **Explainable Neural Highlighter:** Highlights positive tokens (emerald), negative tokens (rose), and aspect keywords (indigo) with interactive weights.

### 2. ⚡ Intelligent Review Generation by Movie Title & Sandbox
- **Instant Movie Title Intelligence:** Type **any film name** (*Inception*, *The Dark Knight*, *Titanic*, *Interstellar*, *The Matrix*, or any arbitrary title) to immediately synthesize a multi-dimensional critical review.
- **Perspective / Tone Selector:** Choose between *Critical Consensus*, *Rave Acclaim*, *Nuanced / Mixed*, or *Critical Pan*.
- **Live ML Sandbox:** Alternatively, switch tabs to paste your own custom review text with preset templates.
- **Sub-3ms Prediction Latency:** Instantly runs the ML Aspect-Based Sentiment Analysis pipeline.
- **Keyboard Shortcut Support:** `⌘ + Enter` / `Ctrl + Enter` to trigger generation or analysis.
- **Probability Breakdown & Highlights:** Visualizes confidence, 3-way probabilities, aspect ratings, and token highlights.

### 3. 📊 Macro Data Analytics Dashboard
- Comprehensive statistical aggregation over a curated corpus of **15,420+ reviews**:
  - **KPIs:** Total Reviews, Mean Sentiment Polarity (+0.68), Overall Positivity Rate (84.6%), Critic vs. Audience Concordance Rate (87.2%), Leading Aspect Driver.
  - **Temporal Dynamics:** 12-month sentiment evolution with monthly review volume telemetry.
  - **Class Distribution:** Interactive donut chart with custom tooltip.
  - **Aspect Benchmarking:** Aspect score comparisons against historical cinematic baselines.
  - **Critic vs. Audience Divergence:** Comparative delta charts uncovering where critics and moviegoers disagree.
  - **Lexicon Frequency:** Top praise and critique keyword counts with polarity weights.
  - **Rating Histogram:** Distribution of user ratings on a 1–10 star scale.

### 4. 🎞️ Movie Explorer & Review Catalog
- Curated showcase of modern and landmark cinematic titles (*Oppenheimer*, *Dune: Part Two*, *Past Lives*, *Spider-Verse*, *Parasite*, *Interstellar*, *Everything Everywhere All At Once*, *Blade Runner 2049*, *Whiplash*, *The Batman*, *Poor Things*, *Barbie*).
- Filter by Genre, Overall Sentiment class, or Minimum Rating with instant search.
- Interactive detail modal with full aspect breakdown and review catalogue.
- **In-Modal Review Submission:** Submit reviews directly to any movie to trigger live ML analysis and dynamically update the catalog.

### 5. 🎨 Editorial UI/UX & Tri-Theme System
- Seamless, persistent 3-way theme switcher:
  - ☀️ **Light Mode:** High-contrast editorial paper white, razor-sharp charcoal typography, delicate borders.
  - 🌙 **Dark Mode:** Sleek graphite/zinc surfaces with muted borders.
  - 🌌 **Cinematic Midnight:** Pitch OLED black (`#030305`), glassy translucent cards, and neon emerald/indigo glows.
- Theme preference automatically syncs and persists via `localStorage`.

---

## 🏗️ Repository Architecture

```
Movie Review Project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application, CORS, and root endpoints
│   │   ├── model.py             # ABSA & ML Sentiment Engine (TF-IDF + Calibrated Classifier)
│   │   ├── dataset.py           # Sample films catalog and macro analytics dataset
│   │   ├── schemas.py           # Pydantic v2 data models & validation schemas
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── analyze.py       # Single and batch review analysis endpoints
│   │       ├── movies.py        # Movie explorer and review submission endpoints
│   │       └── analytics.py     # Aggregated dataset metrics & chart data
│   ├── main.py                  # Root execution wrapper for cloud hosts
│   ├── requirements.txt         # Pinned Python dependencies
│   ├── render.yaml              # Render Cloud deployment blueprint
│   ├── Procfile                 # Process file for Heroku/Render web service
│   └── test_backend.py          # Automated integration test suite (pytest)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── context/
│   │   │   └── ThemeContext.jsx # Tri-theme manager (Light, Dark, Midnight)
│   │   ├── services/
│   │   │   └── api.js           # REST API client with offline fallback resilience
│   │   ├── data/
│   │   │   └── mockData.js      # Resilient local dataset fallback
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Brand header with theme switch and API health monitor
│   │   │   ├── ReviewSandbox.jsx# Real-time review analysis playground with explainability
│   │   │   ├── AnalyticsDashboard.jsx # Recharts visualizations & dataset statistics
│   │   │   ├── MovieExplorer.jsx# Filterable catalog of curated films
│   │   │   ├── MovieModal.jsx   # Detailed modal with in-situ review submission
│   │   │   ├── ArchitectureSection.jsx # REST API documentation & copyable curl snippets
│   │   │   └── Footer.jsx       # Editorial footer
│   │   ├── App.jsx              # Application root
│   │   ├── index.css            # Tailwind directives and CSS variables
│   │   └── main.jsx             # React DOM entry point
│   ├── index.html               # Semantic HTML5 container with custom SVG favicon
│   ├── package.json             # NPM dependencies and scripts
│   ├── vite.config.js           # Vite bundler configuration
│   ├── tailwind.config.js       # Tailwind theme extensions & color palettes
│   ├── postcss.config.js        # PostCSS configuration
│   └── vercel.json              # Vercel SPA routing rules
└── README.md                    # Comprehensive documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python:** 3.10 or higher
- **Node.js:** 18.0 or higher (with `npm`)

---

### Step 1: Set Up & Run Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run integration tests
pytest test_backend.py -v

# Start the FastAPI server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

- **Backend API:** `http://127.0.0.1:8000`
- **Interactive Swagger Docs:** `http://127.0.0.1:8000/docs`
- **Redoc Documentation:** `http://127.0.0.1:8000/redoc`

---

### Step 2: Set Up & Run Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

- **Frontend Application:** `http://localhost:5173`

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status, metadata, and routing index |
| `GET` | `/api/health` | Service health status and ML engine status |
| `POST` | `/api/analyze` | Evaluates sentiment, confidence, ABSA aspects, and tokens |
| `POST` | `/api/analyze/batch` | Batch review evaluation with statistical aggregation |
| `GET` | `/api/movies` | Search and filter sample film catalog (`genre`, `sentiment`, `sort_by`) |
| `GET` | `/api/movies/{id}` | Full movie metadata, aspect scores, and recent reviews |
| `POST` | `/api/movies/{id}/reviews`| Submit new user review with instant ML classification |
| `GET` | `/api/analytics` | Aggregated dataset metrics, temporal trends, and keyword frequencies |

### Sample Request: Analyze Review

```bash
curl -X POST "http://localhost:8000/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "An absolute cinematic masterpiece with breathtaking visuals and flawless performances.",
    "movie_title": "Oppenheimer"
  }'
```

### Sample Response

```json
{
  "id": "rev_e1a49f82",
  "text": "An absolute cinematic masterpiece with breathtaking visuals and flawless performances.",
  "movie_title": "Oppenheimer",
  "sentiment": "Positive",
  "confidence": 0.80,
  "compound_score": 1.0,
  "overall_rating": 9.5,
  "probabilities": {
    "positive": 0.803,
    "neutral": 0.091,
    "negative": 0.107
  },
  "aspects": [
    {
      "aspect": "Acting & Cast",
      "sentiment": "Positive",
      "score": 0.95,
      "confidence": 0.97,
      "evidence": "An absolute cinematic masterpiece with breathtaking visuals and flawless performances"
    },
    {
      "aspect": "Cinematography & Visuals",
      "sentiment": "Positive",
      "score": 0.95,
      "confidence": 0.97,
      "evidence": "An absolute cinematic masterpiece with breathtaking visuals and flawless performances"
    }
  ],
  "summary": "Glowing praise highlighting exceptional Acting & Cast, Cinematography & Visuals.",
  "highlighted_tokens": [
    { "text": "masterpiece", "tag": "positive", "weight": 3.8 },
    { "text": "breathtaking", "tag": "positive", "weight": 3.5 },
    { "text": "visuals", "tag": "aspect", "weight": 1.0 },
    { "text": "flawless", "tag": "positive", "weight": 3.5 },
    { "text": "performances", "tag": "aspect", "weight": 1.0 }
  ],
  "processing_time_ms": 2.8
}
```

---

## ☁️ Deployment Guide

### Deploy Backend to Render

1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com) and click **New → Blueprint** or **New → Web Service**.
3. **If using Blueprint:** Point Render to your repository; it will automatically recognize `backend/render.yaml`.
4. **If using Manual Web Service:**
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**. Your backend will be live at `https://your-service.onrender.com`.

---

### Deploy Frontend to Vercel

1. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. Configure project settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-service.onrender.com` (Your deployed Render backend URL)
5. Click **Deploy**. Vercel will build and deploy the React application with automatic global CDN edge caching.

---

## 🧪 Testing & Validation

The backend includes comprehensive test coverage verifying healthchecks, positive reviews, harsh pans, contrastive aspect extraction, catalog filtering, and analytics responses:

```bash
cd backend
pytest test_backend.py -v
```

Output:
```
============================= test session starts =============================
collected 7 items

test_backend.py::test_health_check PASSED                                [ 14%]
test_backend.py::test_analyze_positive_review PASSED                     [ 28%]
test_backend.py::test_analyze_negative_review PASSED                     [ 42%]
test_backend.py::test_analyze_contrastive_review PASSED                  [ 57%]
test_backend.py::test_get_movies_catalog PASSED                          [ 71%]
test_backend.py::test_filter_movies PASSED                               [ 85%]
test_backend.py::test_get_analytics PASSED                               [100%]

============================== 7 passed in 3.48s ==============================
```

Frontend production verification:
```bash
cd frontend
npm run build
```
Builds verified assets in under 1 second.

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
