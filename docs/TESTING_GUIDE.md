# CipherLink: Testing Guide

This guide explains how to verify that the CipherLink system is functioning correctly after installation or an update.

## 1. Authentication Testing
**Goal**: Verify secure access and role enforcement.
- [ ] **Login**: Attempt to log in with the initial Admin credentials.
- [ ] **Restricted Access**: Try to access `/dashboard/users` as a `TEAM_MEMBER`. It should deny access.
- [ ] **Logout**: Log out and verify you can no longer access the Dashboard via direct URL.
- [ ] **Token Persistence**: Refresh the page; verify you remain logged in (JWT check).

## 2. Chat Testing
**Goal**: Verify real-time messaging capabilities.
- [ ] **Direct Message**: Open the app in two different browsers (User A and User B). Send a message from A to B. Verify B receives it instantly.
- [ ] **Typing Indicator**: Verify that when A types, B sees "User A is typing...".
- [ ] **Read Receipts**: Verify that the message status changes to "Read" once B opens the chat.
- [ ] **Group Chat**: Create a group with A, B, and C. Send a message and verify all three see it.

## 3. File Sharing Testing
**Goal**: Verify robust file handling.
- [ ] **Small File**: Upload a 1MB PDF. Verify it can be downloaded and opened.
- [ ] **Medium File**: Upload a 100MB ZIP file. Verify progress bar accuracy.
- [ ] **Large File (Stress Test)**: Upload a 1GB+ file. Verify that the system remains responsive during the upload.
- [ ] **Resume Test**: Start a large upload, disconnect your network for 5 seconds, and reconnect. Verify the upload resumes automatically.

## 4. Security Testing
**Goal**: Verify data protection and isolation.
- [ ] **Encryption**: Access the MinIO console (Port 9001). Check a stored file. It should be encrypted/unreadable without the application's key.
- [ ] **SQL Injection**: Attempt basic SQL injection in the username field (e.g., `' OR 1=1 --`). Verify the system denies access.
- [ ] **RBAC Enforcement**: Verify that a `PROJECT_MANAGER` cannot delete a team they do not own.

## 5. Performance Testing
**Goal**: Verify stability under load.
- [ ] **Concurrency**: Simulate 10 users sending messages simultaneously. Verify no messages are lost.
- [ ] **System Resources**: Use `docker stats` during a 10GB file transfer. Verify CPU/Memory usage remains within expected limits.
