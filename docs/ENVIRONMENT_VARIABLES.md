# Environment Variable Documentation

This document lists all environment variables used in the CipherLink application.

## Backend (`backend/.env`)

| Variable | Example | Purpose |
|----------|---------|---------|
| `PORT` | `3001` | Port the NestJS server listens on. |
| `NODE_ENV` | `development` | Application environment (development/production). |
| `DATABASE_HOST` | `localhost` | PostgreSQL server host. |
| `DATABASE_PORT` | `5432` | PostgreSQL server port. |
| `DATABASE_USER` | `cipherlink_user` | PostgreSQL username. |
| `DATABASE_PASSWORD` | `admin` | PostgreSQL password. |
| `DATABASE_NAME` | `cipherlink` | PostgreSQL database name. |
| `DATABASE_URL` | `postgres://user:pass@host:port/db` | Full connection string (used by some tools). |
| `JWT_SECRET` | `Admin@72908` | Secret key for signing JWT tokens. |
| `JWT_EXPIRATION` | `1d` | How long the JWT token is valid. |
| `ENCRYPTION_KEY` | `12345678901234567890123456789012` | 32-character key for AES-256-GCM message encryption. |
| `REDIS_URL` | `redis://localhost:6379` | Connection string for Redis. |
| `MINIO_ENDPOINT` | `localhost` | MinIO server host. |
| `MINIO_PORT` | `9000` | MinIO API port. |
| `MINIO_USE_SSL` | `false` | Set to true if using HTTPS for MinIO. |
| `MINIO_ACCESS_KEY` | `minio_admin` | MinIO access key. |
| `MINIO_SECRET_KEY` | `minio_password` | MinIO secret key. |
| `MINIO_BUCKET` | `messenger` | Bucket name for storing files. |

## Frontend (`frontend/.env.local`)

| Variable | Example | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | `http://192.168.1.100:3001` | Backend API URL (must be accessible by client). |
| `NEXT_PUBLIC_SOCKET_URL` | `http://192.168.1.100:3001` | WebSocket server URL. |
| `NEXT_PUBLIC_APP_NAME` | `CipherLink` | Name of the application displayed in UI. |
