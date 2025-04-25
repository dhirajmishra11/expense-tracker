const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Utilities', 'Others']
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create index for date field for better query performance
expenseSchema.index({ date: 1 });

module.exports = mongoose.model('Expense', expenseSchema);