# Enterprise LAN Messenger & File Sharing System

## Overview
This system is designed for high-security, offline-only organizational communication.

## Architecture
- **Backend**: NestJS (Node.js framework)
- **Frontend**: Next.js (React framework)
- **Database**: PostgreSQL
- **Cache**: Redis
- **Object Storage**: MinIO (Self-hosted S3 compatible)
- **Real-time**: Socket.IO

## Security
- **Authentication**: JWT with Refresh Tokens
- **RBAC**: Multi-level roles (Admin, Super User, Team Lead, etc.)
- **Encryption**: AES-256-GCM for messages and files
- **Infrastructure**: Zero Trust principles applied

## Deployment
Use Docker Compose for easy deployment:
```bash
docker-compose up -d
```
