const Expense = require('../models/Expense');
const addExpense = async (req, res) => {
    const { name, category, amount, date } = req.body;

    try {
        const newExpense = new Expense({
            name,
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

module.exports = { addExpense };