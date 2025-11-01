const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, deleteExpense, editExpense } = require('../controllers/expenseController');
const { isLoggedin, isAuthenticated } = require('../middleware/authMiddleware');
router.post('/', isLoggedin, addExpense);
router.put('/:id', isLoggedin, editExpense);
router.delete('/:id', isLoggedin, deleteExpense)
router.get('/', isLoggedin, getExpenses);

module.exports = router;