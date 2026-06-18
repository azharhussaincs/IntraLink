# Local Development Setup Guide

This guide explains how to set up and run the **CipherLink** Enterprise LAN Messenger on your local machine for development and testing.

## 1. Prerequisites
- **Node.js**: v18.x (v18.20.8 used for development)
- **npm**: v10.x
- **Docker & Docker Compose**: For running infrastructure services (PostgreSQL, Redis, MinIO)

## 2. Infrastructure Setup (Docker)
Start the required services using Docker Compose:
```bash
docker compose up -d postgres redis minio
```

## 3. Backend Setup
1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   ```bash
   cp .env.example .env
   # The default values in .env.example are configured for local Docker services
   ```
4. **Run the backend**:
   ```bash
   npm run start:dev
   ```
   The backend will be available at `http://localhost:3001`.

## 4. Frontend Setup
1. **Navigate to frontend directory** (from a new terminal at the project root):
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   ```bash
   cp .env.local.example .env.local
   ```
4. **Run the frontend**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

## 5. Testing & Verification

### Create Admin User
By default, the system requires an admin user to manage the organization.
You can use the provided signup API (if enabled) or a database seed script to create the first admin.
*Note: Ensure you have configured the `ADMIN_PASSWORD` in your backend `.env`.*

### Login
1. Open `http://localhost:3000` in your browser.
2. Enter your admin credentials.
3. Upon successful login, you will be redirected to the dashboard.

### Test Chat
1. Open two different browsers (or one in incognito mode).
2. Login with two different user accounts.
3. Search for the other user in the sidebar.
4. Send a message and verify it appears in real-time for the other user.

### Test File Upload
1. In a chat window, click the attachment icon.
2. Select a file (try a small file first, then a larger one).
3. Verify the upload progress and successful delivery.
4. Click the download icon on the received file to verify file integrity.

### Test Groups
1. Navigate to the Groups section.
2. Click "Create New Group".
3. Add members and start a group discussion.
4. Verify all members receive group messages.

### Role Permissions
1. Create a user with the `TEAM_MEMBER` role.
2. Verify they cannot access Admin-only sections (like User Management).
3. Verify `SUPER_USER` can broadcast messages to all users.
