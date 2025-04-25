const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getSummary,
  getExpenseReport,
  exportCSV
} = require('../controllers/expenseController');

// Validation middleware
const validateExpense = [
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('category').isIn(['Food', 'Transportation', 'Entertainment', 'Shopping', 'Utilities', 'Others']),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('description').optional().trim().isLength({ max: 500 })
];

router.post('/', validateExpense, createExpense);
router.get('/', getExpenses);
router.put('/:id', validateExpense, updateExpense);
router.delete('/:id', deleteExpense);
router.get('/summary', getSummary);
// Add new route
router.get('/export', getExpenseReport);
// Add this new route
router.get('/export/csv', exportCSV);

module.exports = router;