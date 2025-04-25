# Expense Tracker

A full-stack expense tracking application built with MERN stack (MongoDB, Express.js, React, Node.js)

## Features

- User authentication with JWT
- Add/Edit/Delete expenses
- Filter expenses by category and month
- Visualize expenses with charts
- Export expenses to CSV
- Responsive design
- Secure API endpoints
- Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Chart.js
- Axios
- React Hot Toast
- Hero Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Token
- bcryptjs
- Express Validator

## Getting Started

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
npm install
```

3. Create a `.env` file in the server directory with:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:

```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd client
npm run dev
```
