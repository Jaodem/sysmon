# Servicio encargado de recolectar métricas del sistema operativo
import psutil
from app.models.metrics import MetricSnapshot
from app.database.connection import AsyncSessionLocal

def get_cpu_metrics() -> dict:
    """
    Retorna métricas actuales de uso de CPU
    percent=False evita el bloque de 1 segundo en la primera llamada.
    """
    return {
        "usage_percent": psutil.cpu_percent(interval=1),
        "core_count_physical": psutil.cpu_count(logical=False),
        "core_count_logical": psutil.cpu_count(logical=True),
        "frequency_mhz": psutil.cpu_freq().current if psutil.cpu_freq() else None,
    }

def get_memory_metrics() -> dict:
    """
    Retorna métricas actuales de uso de memoria RAM.
    Los valores vienen eb bytes, se los convierte a MB para legibilidad.
    """
    memory = psutil.virtual_memory()
    return {
        "total_mb": round(memory.total / 1024 ** 2, 2),
        "available_mb": round(memory.available / 1024 ** 2, 2),
        "used_mb": round(memory.used / 1024 ** 2, 2),
        "usage_percent": memory.percent,
    }

def get_disk_metrics() -> dict:
    """
    Retorna métricas de uso de disco en la partición raíz.
    """
    disk = psutil.disk_usage("/")
    return {
        "total_gb": round(disk.total / 1024 ** 3, 2),
        "used_gb": round(disk.used / 1024 ** 3, 2),
        "free_gb": round(disk.free / 1024 ** 3, 2),
        "usage_percent": disk.percent,
    }

def get_system_snapshot() -> dict:
    """
    Retorna un snapshot completo del estado actual del sistema.
    Esta función agrupa todas las métricas en un solo objeto.
    """
    return {
        "cpu": get_cpu_metrics(),
        "memory": get_memory_metrics(),
        "disk": get_disk_metrics(),
    }

async def save_snapshot() -> MetricSnapshot:
    """
    Recolecta las métricas actuales del sistema y las persiste en la base de datos.
    Retorna el objeto guardado con su ID y timestamp asignados por PosrgreSQL.
    """
    snapshot_data = get_system_snapshot()

    snapshot = MetricSnapshot(
        cpu_usage_percent=snapshot_data["cpu"]["usage_percent"],
        cpu_frequency_mhz=snapshot_data["cpu"]["frequency_mhz"],
        memory_total_mb=snapshot_data["memory"]["total_mb"],
        memory_used_mb=snapshot_data["memory"]["used_mb"],
        memory_usage_percent=snapshot_data["memory"]["usage_percent"],
        disk_total_gb=snapshot_data["disk"]["total_gb"],
        disk_used_gb=snapshot_data["disk"]["used_gb"],
        disk_usage_percent=snapshot_data["disk"]["usage_percent"],
    )

    async with AsyncSessionLocal() as session:
        session.add(snapshot)
        await session.commit()
        await session.refresh(snapshot)

    return snapshot