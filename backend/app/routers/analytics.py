from fastapi import APIRouter
from typing import Dict, Any

from app.schemas import AnalyticsResponse
from app.dataset import GLOBAL_ANALYTICS

router = APIRouter(prefix="/api/analytics", tags=["Data Analytics Engine"])

@router.get("", response_model=AnalyticsResponse)
async def get_analytics_dashboard_data():
    """
    Returns aggregated dataset statistics, sentiment trends, aspect benchmarks,
    critic vs audience comparisons, and sentiment keyword frequency distributions.
    """
    return GLOBAL_ANALYTICS
