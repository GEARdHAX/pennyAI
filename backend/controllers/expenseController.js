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

const editExpense = async (req, res) => {
    const { title, category, amount, date } = req.body;
    const expenseId = req.params.id;
    try {
        const expense = await Expense.findByIdAndUpdate(expenseId, {
            title,
            category,
            amount,
            date,
        }, { new: true });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(expense);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};

const deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
    try {
        const expense = await Expense.findByIdAndDelete(expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
    }
    catch (error) {
        return res.status(500).send('Server Error');
    }
}



module.exports = { addExpense, getExpenses, editExpense, deleteExpense};