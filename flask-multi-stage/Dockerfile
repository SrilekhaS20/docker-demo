FROM python:3.12-alpine AS builder

WORKDIR /app

COPY requirements.txt .

RUN apk add --no-cache gcc musl-dev libffi-dev && pip install --no-cache-dir -r requirements.txt

COPY . .

FROM python:3.12-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5000

CMD ["python", "app.py"]
