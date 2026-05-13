# Endpoint WebSocket para streaming de métricas en tiempo real
import asyncio
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.collector import save_snapshot
from app.services.alert_engine import evaluate_alerts

router = APIRouter(tags=["WebSockets"])

@router.websocket("/ws/metrics")
async def stream_metrics(websocket: WebSocket) -> None:
    """
    Establece una conexión WebSocket y envía métricas cada 2 segundos.
    Guarda cada snapshot en la base de datos automáticamente.
    Cierra limpiamente cuando el cliente se desconecta.
    """
    await websocket.accept()

    try:
        while True:
            # Se recolectan y se persisten las métricas
            snapshot = await save_snapshot()
            alerts = await evaluate_alerts(snapshot)
    
            # Se serializa el snapshot a un dict para enviarlo como JSON
            payload = {
                "id": snapshot.id,
                "recorded_at": snapshot.recorded_at.isoformat(),
                "cpu": {
                    "usage_percent": snapshot.cpu_usage_percent,
                    "frequency_mhz": snapshot.cpu_frequency_mhz,
                },
                "memory": {
                    "total_mb": snapshot.memory_total_mb,
                    "used_mb": snapshot.memory_used_mb,
                    "usage_percent": snapshot.memory_usage_percent,
                },
                "disk": {
                    "total_gb": snapshot.disk_total_gb,
                    "used_gb": snapshot.disk_used_gb,
                    "usage_percent": snapshot.disk_usage_percent,
                },
                "alerts": [
                    {
                        "metric": a.metric,
                        "value": a.value,
                        "threshold": a.threshold,
                        "message": a.message,
                    }
                    for a in alerts
                ]
            }
    
            await websocket.send_text(json.dumps(payload))
    
            # Se espera 2 segundos antes del próximo envío
            # asyncio.sleep libera el hilo — no bloquea otros requests
            await asyncio.sleep(2)

    except WebSocketDisconnect:
        # El cliente cerró la conexión — es el flujo normal, no un error
        print("Cliente desconectado del WebSocket de métricas")