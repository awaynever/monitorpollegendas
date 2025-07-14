# Dockerfile para API Flask leve
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY api_backend.py .
COPY .env .

EXPOSE 5000

CMD ["python", "api_backend.py"]
