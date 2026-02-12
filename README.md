#  Full Stack Todo App

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,typescript,react,postgres,prisma" />
</p>

<p align="center">
  Secure full-stack Todo application with JWT authentication, HTTP-only cookies, protected routes, and full CRUD functionality.
</p>

---

#  Features

- User Registration & Login  
- JWT Authentication (HTTP-only secure cookies)  
- Rate Limiting Middleware  
- Protected Routes  
- Full CRUD Task Management  
- Responsive React Frontend  

---

##  Authentication

- JWT stored in `accessToken` cookie  
- `httpOnly: true`  
- `secure: true`  
- `sameSite: none`  
- 30 minute expiry  

All task routes require a valid cookie.

---
# Architecture Overview

## High-Level System Flow

Client (React + TypeScript)
→ Express API (Node.js)
→ Rate Limiting Middleware
→ Authentication Middleware
→ Route Controller
→ Route Services
→ Route Model
→ Prisma ORM
→ PostgreSQL Database
→ Structured JSON Response
→ Client State Update

---

## System Flow Diagram

### Auth Flow
```
[ Client (React + TypeScript) ]
        │
        ▼
[ Express API (Node.js) ]
        │
        ▼
[ Rate Limiting Middleware ]
        │   - Prevents brute-force login attempts
        ▼
[ Auth Controller ]
        │   - Validates request body
        │   - Calls Auth Service
        ▼
[ Auth Service ]
        │   - Verifies credentials
        │   - Handles password comparison
        │   - Generates JWT access token
        ▼
[ Auth Model ]
        │   - Fetches user record
        ▼
[ Prisma ORM ]
        │   - Executes user query
        ▼
[ PostgreSQL Database ]
        │   - Returns user data
        ▼
[ Set HTTP-only Secure Cookie ]
        │   - accessToken (short expiry)
        ▼
[ Structured JSON Response ]
        │
        ▼
[ Client State Update ]
            - User marked as authenticated
```
### Protected Task Flow
```
[ Client Request /tasks ]
        │
        ▼
[ Express API ]
        │
        ▼
[ Rate Limiting Middleware ]
        │   - Prevents API abuse
        ▼
[ Authentication Middleware ]
        │   - Reads HTTP-only cookie
        │   - Verifies JWT signature
        │   - Checks expiration
        │   - Attaches userId to request
        ▼
[ Tasks Controller ]
        │   - Validates request params
        │   - Calls Task Service
        ▼
[ Task Service ]
        │   - Applies business logic
        │   - Ensures user-scoped operations
        ▼
[ Task Model ]
        │   - Prepares DB query
        ▼
[ Prisma ORM ]
        │   - Executes type-safe task query
        ▼
[ PostgreSQL Database ]
        │   - Returns user-specific tasks
        ▼
[ Structured JSON Response ]
        │
        ▼
[ React State Update ]
            - UI re-renders with task data
```
---

### Request Lifecycle (Protected Route Example)

- User logs in via `/auth/login`.
- Server validates credentials against the database.
- A JWT access token is generated.
- The token is stored in an HTTP-only, secure cookie with a 30-minute expiry.
- For subsequent protected requests (e.g., `/tasks`), the request first passes through rate limiting middleware.
- Rate limiting checks request frequency and blocks excessive traffic to mitigate abuse.
- The request then passes through authentication middleware.
- Middleware reads the cookie, verifies the JWT signature.
- If valid, the decoded user ID is attached to the request object.
- The controller uses Prisma to query tasks scoped to the authenticated user.
- The server returns structured JSON, which updates the React frontend state.

---

### Authentication & Security Decisions

- JWT stored in HTTP-only cookies to reduce XSS exposure risk compared to localStorage.
- `secure: true` flag enabled to enforce HTTPS transmission.
- Short-lived access tokens (30 minutes) to limit exposure risk.
- All task routes protected using centralized authentication middleware.
- Rate limiting applied globally and/or on auth routes to prevent brute-force and abuse attempts.

---

### Database Layer

- Prisma ORM used for type-safe database access.
- PostgreSQL as the relational database.
- Tasks are relationally mapped to users.
- All task queries are scoped using authenticated user ID to enforce data isolation.
- Database operations structured to minimize unnecessary queries and improve performance.

---

### Error Handling Strategy

- Consistent JSON response format across all endpoints.
- 401 Unauthorized for invalid or expired tokens.
- 429 Too Many Requests for rate limit violations.
- 400 for validation errors.
- 500 for unexpected server failures.
- Frontend gracefully handles errors and provides user feedback.

#  API Documentation

## AUTH → `/auth`

| Method | Route        | Description |
|--------|-------------|------------|
| POST   | /register   | Register new user |
| POST   | /login      | Login user (sets cookie) |
| POST   | /logout     | Clear auth cookie |
| GET    | /me         | Validate authentication |

---

## TASKS → `/tasks` (Protected)

| Method | Route        | Description |
|--------|-------------|------------|
| GET    | /           | Get all tasks |
| POST   | /           | Create task |
| PUT    | /:id        | Update task completion |
| DELETE | /:id        | Delete single task |
| DELETE | /all        | Delete all tasks |

---

##  Backend

- Node.js  
- Express  
- TypeScript  
- Prisma ORM  
- PostgreSQL  
- JWT Cookie Authentication  
- Rate Limiting Middleware  

---

## 🎨 Frontend

- React  
- TypeScript  
- Responsive UI  

---

##  Environment Variables

Create a `.env` file:

DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
PORT=5000

---
##  Live Links

Backend: https://fullstack-todo-app-hgxg.onrender.com                                                                                                                                                
Frontend: https://full-stack-todo-app-eta-seven.vercel.app/

---

##  Installation

```
git clone https://github.com/Hannank485/FullStack-Todo-App
cd project
npm install
npm run dev
```
---


CORS configured with credentials enabled

📄 License
Portfolio / Learning Project
