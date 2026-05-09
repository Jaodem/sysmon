# Imagen base — Python 3.12 slim es más liviano que la versión completa
# Se usa 3.12 en lugar de 3.14 porque tiene mejor soporte en imágenes oficiales
FROM python:3.12-slim

# Se definine el directorio de trabajo dentro del contenedor
WORKDIR /app

# Se copia primero solo el archivo de dependencias
# Esto aprovecha el sistem de caché de Docker — si requirements.txt no cambia,
# Docker no reinstala las dependecias en cada build, lo que mejora la eficiencia
COPY requirements.txt .

# Se instalan las dependencias
# --no-cache-dir evitar guardar caché de pip dentro de la imagen, haciéndola más liviana
RUN pip install --no-cache-dir -r requirements.txt

# Se copia el resto del código fuente
COPY . .

# Se documenta que la aplicación usa el puerto 8000
EXPOSE 8000

# Comando que se ejecuta cuando el contenedor arranca
# --host 0.0.0.0 es crucial — sin esto uvicorn solo escucha dentro del contenedor
# y no sería accesible desde tu máquina
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]