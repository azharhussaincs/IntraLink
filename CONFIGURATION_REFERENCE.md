# Configuration Reference

Detailed mapping of all environment variables used in the CipherLink system.

## Backend Variables (`backend/.env`)

| Variable | File | Purpose | Example |
| -------- | ---- | ------- | ------- |
| `PORT` | `main.ts` | Backend listening port | `3001` |
| `DATABASE_URL` | `app.module.ts` | PostgreSQL connection string | `postgres://user:pass@db:5432/db` |
| `REDIS_URL` | `app.module.ts` | Redis connection URL | `redis://redis:6379` |
| `JWT_SECRET` | `auth.module.ts` | Secret for access tokens | `your-secret-key` |
| `JWT_REFRESH_SECRET` | `auth.module.ts` | Secret for refresh tokens | `your-refresh-secret` |
| `ENCRYPTION_KEY` | `encryption.service.ts`| 32-char key for AES-256 | `32-character-secret-key-1234567` |
| `MINIO_ENDPOINT` | `files.service.ts` | MinIO server address | `localhost` |
| `MINIO_PORT` | `files.service.ts` | MinIO API port | `9000` |
| `MINIO_ACCESS_KEY` | `files.service.ts` | MinIO access key | `minioadmin` |
| `MINIO_SECRET_KEY` | `files.service.ts` | MinIO secret key | `minioadmin` |
| `MINIO_BUCKET` | `files.service.ts` | Default bucket name | `cipherlink` |

## Frontend Variables (`frontend/.env.local`)

| Variable | File | Purpose | Example |
| -------- | ---- | ------- | ------- |
| `NEXT_PUBLIC_API_URL` | `api/client.ts` | Backend API Base URL | `http://localhost:3001/api` |
| `NEXT_PUBLIC_WS_URL` | `socket/client.ts`| WebSocket Server URL | `http://localhost:3001` |
| `NEXT_PUBLIC_APP_NAME`| `layout.tsx` | Application Name | `CipherLink` |

## Docker Environment Variables (`docker-compose.yml`)

When running via Docker, these variables are often set directly in the `docker-compose.yml` or a `.env` file at the project root.

- **PostgreSQL**: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- **MinIO**: `MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`
- **Redis**: Usually default ports/no auth in internal LAN network.
