const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const auth = require('./middleware/auth');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://expense-tracker-as4o.onrender.com'
  ],
  credentials: true,
  exposedHeaders: ['Content-Disposition']
}));


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', auth, require('./routes/expenseRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
