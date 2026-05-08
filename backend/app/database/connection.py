# Configuración de la conexión asíncrona a PostgreSQL
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("La variable de entorno DATABASE_URL no está configurada")

# El engine es el objeto central que maneja la conexión con la base de datos
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
)

# La sesión es la unidad de trabajo -- cada request abre y cierra una sesión
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

class Base(DeclarativeBase):
    """
    Clase base de la que van a heredar todos los modelos.
    SQLAlchemy la usa para rastrear qué tablas existen
    """
    pass

async def get_db():
    """
    Generador de sesiones para usar como dependencia en los endpoints.
    Garantiza que la sesión se cierre aunque ocurra un error.
    """
    async with AsyncSessionLocal() as session:
        yield session