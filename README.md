# BudgetAxis — MERN Expense & Budget Tracker

A full-stack expense tracker built with MongoDB, Express, React, and Node.js.
Features JWT authentication, MongoDB aggregation-powered analytics, budget alerts,
category filtering, and interactive charts (Recharts).

## Features

- 🔐 JWT authentication (register/login)
- 💸 Add / edit / delete income & expense transactions
- 📊 Dashboard with pie chart (spending by category) and 6-month income vs. expense bar chart
- 🎯 Monthly budget setting with over-budget alert banner
- 🔍 Filter transactions by type, category, and date range
- ⚡ Backend analytics computed via MongoDB aggregation pipelines (not client-side loops)

## Tech Stack

**Frontend:** React 18, Vite, Redux Toolkit, React Router, Tailwind CSS, Recharts, Axios
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

## Project Structure

```
expense-tracker/
├── server/          # Express API
│   ├── config/       # DB connection
│   ├── models/       # User, Transaction schemas
│   ├── controllers/  # Route handlers + aggregation logic
│   ├── routes/        # /api/auth, /api/transactions
│   ├── middleware/   # JWT auth, error handling
│   └── server.js
└── client/          # React app
    └── src/
        ├── api/       # Axios instance
        ├── redux/     # authSlice, transactionSlice
        ├── components/
        ├── pages/     # Login, Register, Dashboard, Transactions
        └── App.jsx
```

## Local Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI (MongoDB Atlas connection string) and JWT_SECRET
npm run dev
```
Server runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev
```
App runs on `http://localhost:5173`.

### 3. MongoDB Atlas (free tier)

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user + password
3. Network Access → allow access from anywhere (0.0.0.0/0) for deployment
4. Copy the connection string into `server/.env` as `MONGO_URI`

## Deployment

### Backend → Render

1. Push this repo to GitHub
2. On Render: New → Web Service → connect repo, root directory `server`
3. Build command: `npm install` | Start command: `npm start`
4. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL once deployed)

### Frontend → Vercel

1. On Vercel: New Project → import repo, root directory `client`
2. Framework preset: Vite
3. Add environment variable: `VITE_API_URL` = your Render backend URL + `/api`
4. Deploy

Once both are live, update `CLIENT_URL` on Render to match your Vercel domain (for CORS) and redeploy the backend.

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in, returns JWT |
| GET | `/api/auth/me` | Get logged-in user |
| PUT | `/api/auth/budget` | Update monthly budget |
| GET | `/api/transactions` | List transactions (filters: `from`, `to`, `category`, `type`) |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |
| GET | `/api/transactions/summary` | Aggregated analytics (`month`, `year` query params) |

## Resume Bullet Points

- Built a full-stack MERN expense tracker with JWT authentication and MongoDB aggregation pipelines powering real-time spending analytics
- Designed RESTful APIs with role-scoped data access and date-range/category filtering
- Implemented interactive data visualizations (Recharts) for category breakdown and 6-month income vs. expense trends
- Added budget-tracking feature with automatic over-budget alerts, calculated server-side
