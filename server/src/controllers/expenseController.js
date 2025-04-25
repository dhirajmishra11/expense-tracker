const Expense = require('../models/Expense');
const { validationResult } = require('express-validator');

// Update the createExpense function
exports.createExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const expense = new Expense({
      ...req.body,
      user: req.userId
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the getExpenses function
exports.getExpenses = async (req, res) => {
  try {
    const { month, page = 1, limit = 10 } = req.query;
    let query = { user: req.userId };
    
    if (month) {
      const startDate = new Date(month);
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      query.date = {
        $gte: startDate,
        $lte: endDate
      };
    }
    
    const skip = (page - 1) * limit;
    
    const [expenses, total] = await Promise.all([
      Expense.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Expense.countDocuments(query)
    ]);

    res.json({
      expenses,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(month);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    
    const summary = await Expense.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new controller method
exports.getExpenseReport = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(month);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    
    const expenses = await Expense.find({
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    const report = {
      month,
      total: expenses.reduce((sum, exp) => sum + exp.amount, 0),
      expenses: expenses.map(exp => ({
        date: exp.date,
        category: exp.category,
        amount: exp.amount,
        description: exp.description
      }))
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add this new method
exports.exportCSV = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(month);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    
    const expenses = await Expense.find({
      user: req.userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    // Add BOM for Excel to recognize UTF-8
    const BOM = '\uFEFF';
    const csvRows = [
      // Headers
      ['Date', 'Category', 'Amount', 'Description'],
      // Data rows
      ...expenses.map(expense => [
        new Date(expense.date).toLocaleDateString(),
        expense.category,
        expense.amount.toFixed(2),
        expense.description || ''
      ])
    ];

    const csvContent = BOM + csvRows.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=expenses-${month}.csv`);
    res.send(csvContent);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: error.message });
  }
};