const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
    const { title, category, amount, date } = req.body;

    try {
        const newExpense = new Expense({
            user: req.user.id,
            title,
            category,
            amount,
            date,
        });

        const expense = await newExpense.save();
        res.status(201).json(expense);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


module.exports = { addExpense, getExpenses };