# Punto de entrada principal de la aplicación FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import metrics, websockets

app = FastAPI(
    title="Sysmon API",
    description="API de monitoreo de procesos y métricas del sistema",
    version="0.1.0",
)

# CORS: permite que el frontend (Next.js en otro puerto) hable con esta API
# En producción, se reemplazaría "*" por la URL exacta del frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(metrics.router)
app.include_router(websockets.router)

@app.get("/")
async def root():
    """
    Endpoint de bienvenida, útil para verificar que la API está viva.
    """
    return {
        "status": "ok",
        "message": "Sysmon API is running",
    }