const express = require('express');
const router = express.Router();
const { addExpense, getExpenses } = require('../controllers/expenseController');
const { isLoggedin, isAuthenticated } = require('../middleware/authMiddleware');
router.post('/', isLoggedin, addExpense);

router.get('/', isLoggedin, getExpenses);

module.exports = router;