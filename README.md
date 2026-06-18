# Enterprise LAN Messenger & File Sharing System (CipherLink)

## Project Overview
CipherLink is a complete enterprise-grade, offline-first communication and file-sharing platform designed for organizations. The application operates entirely within a Local Area Network (LAN), ensuring that chat, file transfers, and collaboration remain strictly private and secure, even if the building has internet access.

The system is deployed on an organization's internal server, and users connect via the server's IP address. It combines the ease of use of Slack and Microsoft Teams with a Zero Trust security architecture and end-to-end encryption.

### Key Features
- **Offline-First Architecture**: Zero dependency on external APIs or cloud services.
- **Zero Trust Security**: Every request is authenticated and authorized; includes Device Validation.
- **End-to-End Encryption**: Messages and file metadata are encrypted using AES-256-GCM.
- **Real-Time Communication**: Instant messaging, typing indicators, and presence management via WebSockets.
- **Large File Support**: Optimized for files from 10MB to 50GB+ with chunked uploading and streaming.
- **Role-Based Access Control (RBAC)**: 6 distinct roles (Admin, Super User, Team Lead, etc.).
- **Daily Reporting System**: Built-in workflow for Team Leads to submit daily/weekly status updates.

### Technology Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, ShadCN UI
- **Backend**: Node.js, NestJS 11, TypeScript
- **Database**: PostgreSQL (Primary Data)
- **Cache**: Redis (Real-time Pub/Sub & Caching)
- **Storage**: MinIO (Self-hosted S3-compatible storage)
- **Real-Time**: Socket.io
- **Security**: JWT, Argon2 (Hashing), AES-256-GCM (Encryption)

## 🎨 UI/UX Design
CipherLink features a professional, high-fidelity user interface inspired by Slack and Microsoft Teams.
- **Enterprise Dashboard**: Real-time analytics, quick actions, and organizational hierarchy visualization.
- **Dark/Light Mode**: Full system-wide theme support.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile devices.
- **Clean Navigation**: Collapsible sidebar, global header, and breadcrumb-based workflows.

---

## Architecture Diagrams

### System Architecture
```mermaid
graph TD
    User((User)) -->|HTTPS/WSS| Frontend[Next.js Frontend]
    Frontend -->|REST API| Backend[NestJS Backend]
    Backend -->|Queries| DB[(PostgreSQL)]
    Backend -->|Cache/Events| Redis[(Redis)]
    Backend -->|Object Storage| MinIO[(MinIO)]
    Backend -->|Real-time| Socket[Socket.io]
    Socket <-->|WSS| User
```

### Authentication Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant DB
    User->>Frontend: Enter Username/Password
    Frontend->>Backend: POST /auth/login
    Backend->>DB: Verify User & Hash
    DB-->>Backend: User Data
    Backend-->>Frontend: JWT Access & Refresh Tokens
    Frontend->>User: Redirect to Dashboard
```

### File Upload Flow (Large Files)
```mermaid
graph LR
    User -->|File Chunks| Frontend
    Frontend -->|POST /files/upload/chunk| Backend
    Backend -->|Stream| MinIO
    Backend -->|Verify Hash| DB
    MinIO -->|Acknowledge| Backend
    Backend -->|Progress| User
```

---

## Prerequisites
Before installation, ensure your server has:
- **Docker** & **Docker Compose**
- **Node.js 20+** (for local development)
- **PostgreSQL 15+**
- **Redis 7+**

---

## Installation & Setup

### 1. Docker Deployment (Recommended)
The fastest way to deploy CipherLink is using Docker Compose.

```bash
# Clone the repository
git clone <repository-url>
cd cipherlink

# Start all services
docker-compose up -d
```
All services (Database, Redis, MinIO, Backend, Frontend) will start automatically.

### 2. Local Development Setup
If you want to run the project for development:

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run build
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with NEXT_PUBLIC_API_URL
npm run dev
```

---

## Environment Variables

### Backend (`.env`)
| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Backend API port | `3001` |
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret key for signing tokens | `random_long_string` |
| `ENCRYPTION_KEY` | 32-character key for AES-256 | `your-32-char-key-here` |
| `MINIO_ENDPOINT` | MinIO server address | `localhost` |
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |

---

## Initial Admin Creation
Because public registration is disabled for security, the first Admin must be created via SQL:

1. **Access DB**: `sudo -u postgres psql -d cipherlink`
2. **Execute**:
```sql
INSERT INTO users (username, "passwordHash", role, "fullName", "isActive") 
VALUES ('admin', '$argon2id$v=19$m=65536,t=3,p=4$OMPuX/z1urYuOEQ97b375Q$ie8heCrm2QV7ndfynX3II9VxP6ZLcgpWgox0JhT92to', 'ADMIN', 'System Administrator', true);
```
*Default Credentials: Username: `admin` | Password: `admin`*

---

## Running Tests
```bash
# Backend Tests
cd backend
npm run test        # Unit tests
npm run test:e2e    # E2E tests

# Frontend Tests
cd frontend
npm run test
```

---

## Backup & Recovery
- **Database**: Use `pg_dump` daily to back up the PostgreSQL database.
- **Files**: Back up the MinIO data directory located at `./docker/minio_data`.

---

## Troubleshooting
- **Port 3001 in use**: Run `sudo fuser -k 3001/tcp` to clear the port.
- **MinIO Connection Refused**: Ensure the `MINIO_ENDPOINT` matches your server IP or `localhost` if in Docker.
- **Login Failed**: Ensure you created the initial Admin user as described above.
