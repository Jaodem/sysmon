# Modelo que representa una alerta generada cuando una métrica supera su umbral
from sqlalchemy import Float, Integer, String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.database.connection import Base
from datetime import datetime

class AlertEvent(Base):
    """
    Cada fila representa una alerta disparada en un momento específico.
    Se genera automáticamente cuando una métrica supera su umbral configurado.
    """
    __tablename__ = "alert_events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    triggered_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        index=True,
    )

    # Qué métrica disparó la alerta — "cpu", "memory", "disk"
    metric: Mapped[str] = mapped_column(String(20))

    # El valor que tenía la métrica cuando se disparó la alerta
    value: Mapped[float] = mapped_column(Float)

    # El umbral que se superó
    threshold: Mapped[float] = mapped_column(Float)

    # Mensaje descriptivo para mostrar en el dashboard
    message: Mapped[str] = mapped_column(String(200))