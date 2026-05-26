# NoteSpace

NoteSpace is a full-stack notes app with JWT auth, MongoDB storage, and a React/Vite frontend.

## Project structure

- `backend/` - Express API, MongoDB models, auth, and note routes
- `frontend/` - React app for login, signup, and note management

## Prerequisites

- Node.js
- MongoDB connection string

## Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` with:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the app:

```bash
npm run dev
```

## Features

- User signup and login
- JWT-protected note CRUD
- Create, edit, delete, and view notes
