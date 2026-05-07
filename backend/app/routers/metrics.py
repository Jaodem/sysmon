# Endpoints HTTP relacionados a las métricas del sistema
from fastapi import APIRouter
from app.services.collector import get_system_snapshot

# APIRouter es como un mini-FastAPI para organizar los endpoints por tema
router = APIRouter (
    prefix="/metrics",
    tags=["Métricas"],
)

@router.get("/system")
async def get_system_metrics():
    """
    Retorna un snapshot completo de las métricas actuales del sistema.
    """
    return get_system_snapshot()
