#  Full Stack Todo App

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,typescript,react,postgres,prisma" />
</p>

<p align="center">
  Secure full-stack Todo application with JWT authentication, HTTP-only cookies, protected routes, and full CRUD functionality.
</p>

---

##  Features

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
