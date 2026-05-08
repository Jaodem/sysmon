# Modelos que representa la tabla de snapshots de métricas en la base de datos
from sqlalchemy import Float, Integer, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.database.connection import Base
from datetime import datetime

class MetricSnapshot(Base):
    """
    Cada fila representa un snapshot del estado del sistema en un momento dado.
    Se guarda cada vez que el colector recolecta métricas.
    """
    __tablename__ = "metric_snapshot"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    recorded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        index=True,
    )

    # Métricas de CPU
    cpu_usage_percent: Mapped[float] = mapped_column(Float)
    cpu_frequency_mhz: Mapped[float] = mapped_column(Float, nullable=True)

    # Métricas de memoria
    memory_total_mb: Mapped[float] = mapped_column(Float)
    memory_used_mb: Mapped[float] = mapped_column(Float)
    memory_usage_percent: Mapped[float] = mapped_column(Float)

    disk_total_gb: Mapped[float] = mapped_column(Float)
    disk_used_gb: Mapped[float] = mapped_column(Float)
    disk_usage_percent: Mapped[float] = mapped_column(Float)