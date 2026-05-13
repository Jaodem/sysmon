# Motor de evaluación de alertas — compara métricas contra umbrales configurados
from app.models.alerts import AlertEvent
from app.models.metrics import MetricSnapshot
from app.database.connection import AsyncSessionLocal

# Umbrales por defecto — en el futuro podrían venir de la base de datos
DEFAULT_THRESHOLDS = {
    "cpu": 80.0,
    "memory": 85.0,
    "disk": 90.0,
}

async def evaluate_alerts(snapshot: MetricSnapshot) -> list[AlertEvent]:
    """
    Evalúa si alguna métrica del snapshot supera su umbral configurado.
    Persiste cada alerta detectada en la base de datos.
    Retorna la lista de alertas generadas en esta evaluación.
    """
    triggered: list[AlertEvent] = []

    checks = [
        {
            "metric": "cpu",
            "value": snapshot.cpu_usage_percent,
            "threshold": DEFAULT_THRESHOLDS["cpu"],
            "message": f"CPU al {snapshot.cpu_usage_percent:.1f}% — supera el umbral de {DEFAULT_THRESHOLDS['cpu']}%",
        },
        {
            "metric": "memory",
            "value": snapshot.memory_usage_percent,
            "threshold": DEFAULT_THRESHOLDS["memory"],
            "message": f"RAM al {snapshot.memory_usage_percent:.1f}% — supera el umbral de {DEFAULT_THRESHOLDS['memory']}%",
        },
        {
            "metric": "disk",
            "value": snapshot.disk_usage_percent,
            "threshold": DEFAULT_THRESHOLDS["disk"],
            "message": f"Disco al {snapshot.disk_usage_percent:.1f}% — supera el umbral de {DEFAULT_THRESHOLDS['disk']}%",
        },
    ]

    async with AsyncSessionLocal() as session:
        for check in checks:
            if check["value"] >= check["threshold"]:
                alert = AlertEvent(
                    metric=check["metric"],
                    value=check["value"],
                    threshold=check["threshold"],
                    message=check["message"],
                )
                session.add(alert)
                triggered.append(alert)

        if triggered:
            await session.commit()

    return triggered