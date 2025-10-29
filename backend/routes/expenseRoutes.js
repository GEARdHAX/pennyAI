const express = require('express');
const router = express.Router();
const { addExpense } = require('../controllers/expenseController');

// @route   POST api/expenses
router.post('/', addExpense);

module.exports = router;