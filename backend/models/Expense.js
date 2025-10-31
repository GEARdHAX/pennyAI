const mongoose = require('mongoose');
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title for the expense']
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount'],
        min: 0.01 
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        // Define common categories for better data consistency
        enum: [
            'Food & Dining',
            'Transportation',
            'Housing',
            'Utilities',
            'Entertainment',
            'Shopping',
            'Salary',
            'Other'
        ],
        default: 'Other'
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Please add the date of the expense']
    }
}, {
    timestamps: true
});

const Expense = mongoose.model('expense', expenseSchema)

module.exports = Expense;