# Installation Verification Checklist

Follow this checklist to ensure every component of CipherLink is working correctly.

## 1. Infrastructure Connectivity

- [ ] **Database**: Run `psql -h localhost -U cipherlink_user -d cipherlink` - Connection successful.
- [ ] **Redis**: Run `redis-cli ping` - Returns `PONG`.
- [ ] **MinIO**: Access `http://localhost:9001` (Console) and login with access/secret keys.

## 2. Backend API

- [ ] **API Status**: Visit `http://localhost:3001/auth/login` (GET) - Should return 404 or 405, but not "Connection Refused".
- [ ] **Swagger (if enabled)**: Visit `http://localhost:3001/api` - Documentation loads.

## 3. Frontend Web App

- [ ] **Homepage**: Visit `http://localhost:3000` - Login page loads.
- [ ] **Styling**: Tailwind CSS is rendering correctly (buttons, colors, layout).

## 4. Core Features

- [ ] **Authentication**:
    - [ ] Can register a new user via `POST /auth/register`.
    - [ ] Can login with the registered user.
    - [ ] Receives JWT token in response.
- [ ] **Real-time Chat**:
    - [ ] Open two browser windows.
    - [ ] Send a message from User A to User B.
    - [ ] Message appears instantly without page refresh.
- [ ] **File Sharing**:
    - [ ] Upload a file (e.g., a small PDF).
    - [ ] File appears in the chat.
    - [ ] Can download the file and open it.
- [ ] **Role Management**:
    - [ ] Logged in as `TEAM_MEMBER`.
    - [ ] Try to access Admin routes (if implemented) - Access denied (403).

## 5. Security

- [ ] **Encryption**: Check the database `messages` table - Message content should be encrypted (not plain text).
- [ ] **Tokens**: Access protected routes without a token - Returns 401 Unauthorized.
