import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

const AddExpense = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        note: ''
        date: new Date().toISOString().split('T')[0]

    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [totalToday, setTotalToday] = useState(0);
    const [recentExpenses, setRecentExpenses] = useState([]);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { title, category, amount, date, note, description } = formData;

    useEffect(() => {
        const fetchTodaysExpenses = async () => {
            if (!user) return;

            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get('http://localhost:5000/api/expenses');
                const allExpenses = response.data;
                
                // Calculate total for today
                const todayString = new Date().toISOString().split('T')[0];
                const todaysExpenses = allExpenses.filter(expense => {
                    return new Date(expense.date).toISOString().split('T')[0] === todayString;
                });
                const total = todaysExpenses.reduce((sum, expense) => sum + expense.amount, 0);
                setTotalToday(total);

                // Set the 4 most recent expenses
                setRecentExpenses(allExpenses.slice(0, 4));

            } catch (err) {
                console.error("Failed to fetch expenses:", err);
            }
        };

        fetchTodaysExpenses();
    }, [user]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!user) {
            setError("Authentication error. Please log in again.");
            return;
        }

        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post('http://localhost:5000/api/expenses', formData);

            if (response.status === 201) {
                setMessage('Expense added successfully!');
                setTimeout(() => navigate('/'), 1500);
            } else {
                throw new Error(response.data.message || 'Failed to add expense');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred.');
        }
    };

    // Format date for display
    const formatDisplayDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const inputClasses = "bg-gray-900/40 border border-gray-600 text-white text-lg rounded-2xl focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent block w-full p-4 placeholder-gray-400 backdrop-blur-sm transition-all duration-200 h-14";

            if (response.status === 201) {
                setMessage('Expense added successfully!');
                setTimeout(() => navigate('/'), 1500);
            } else {
                throw new Error(response.data.message || 'Failed to add expense');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred.');
        }
    };

    // Format date for display
    const formatDisplayDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-').map(Number);
        if (!year || !month || !day) return '';

        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-GB');
    };

    const inputClasses = "bg-gray-900/40 border border-gray-600 text-white text-base sm:text-lg rounded-2xl focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent block w-full p-3 sm:p-4 placeholder-gray-400 backdrop-blur-sm transition-all duration-200 h-12 sm:h-14";
    const labelClasses = "block mb-3 text-sm font-medium text-white/80 uppercase tracking-wide";

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#001F3F] to-[#001030] flex'>
            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2 font-['Poppins']">
                            Add New Expense
                        </h1>
                        <p className="text-white/60 text-lg">
            <div className="flex-1 p-4 sm:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-['Poppins']">
                            Add New Expense
                        </h1>
                        <p className="text-white/60 text-base sm:text-lg">
                            Track your spending by adding transaction details below
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Form */}
                        <div className="lg:col-span-2">
                            {/* Transaction Details Card */}
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl mb-8">
                                <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins']">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Left Column - Form */}
                        <div className="lg:col-span-2">
                            {/* Transaction Details Card */}
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 font-['Poppins']">
                                    Transaction Details
                                </h2>
                                <p className="text-white/60 mb-8">
                                    Fill in the information about your expense
                                </p>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-500/20 border border-red-400 rounded-xl text-red-200 text-sm">
                                        {error}
                                    </div>
                                )}
                                {message && (
                                    <div className="mb-6 p-4 bg-green-500/20 border border-green-400 rounded-xl text-green-200 text-sm">
                                        {message}
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="space-y-6">
                                <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
                                    {/* Amount */}
                                    <div>
                                        <label htmlFor="amount" className={labelClasses}>
                                            Amount
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">$</span>
                                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">₹</span>
                                            <input
                                                type="number"
                                                id="amount"
                                                name="amount"
                                                value={amount}
                                                onChange={onChange}
                                                className={inputClasses}
                                                className={`${inputClasses} pl-10 sm:pl-12`}
                                                placeholder="100"
                                                required
                                                min="0.01"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label htmlFor="category" className={labelClasses}>
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={category}
                                            onChange={onChange}
                                            className={inputClasses}
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Food & Dining">Food & Dining</option>
                                            <option value="Transportation">Transportation</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Office">Office</option>
                                            <option value="Utilities">Utilities</option>
                                            <option value="Housing">Housing</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label htmlFor="date" className={labelClasses}>
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={date}
                                            onChange={onChange}
                                            className={inputClasses}
                                            required
                                        />
                                        <p className="text-white/40 text-sm mt-2">
                                            {formatDisplayDate(date)}
                                        </p>
                                    </div>


                                    {/* Note */}
                                    <div>
                                        <label htmlFor="note" className={labelClasses}>
                                    </div>

                                    {/* Title */}
           

                                    {/* Note */}
                                    <div>
                                        <label htmlFor="title" className={labelClasses}>
                                            Note
                                        </label>
                                        <input
                                            type="text"
                                            id="note"
                                            name="note"
                                            value={note}
                                            onChange={onChange}
                                            className={inputClasses}
                                            placeholder="Client lunch at restaurant"
                                        />
                                    </div>

                                            id="title"
                                            name="title"
                                            value={title}
                                            onChange={onChange}
                                            className={inputClasses}
                                            placeholder="Had dinner with friends"
                                        />
                                    </div>

                                    {/* Description */}

                                    {/* Submit Button */}
                                    <button 
                                        type="submit" 
                                        className="w-full bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white font-bold rounded-2xl py-5 px-6 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-200 focus:ring-4 focus:ring-blue-400/30 font-['Poppins'] text-xl mt-8"
                                        className="w-full bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white font-bold rounded-2xl py-4 sm:py-5 px-6 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-200 focus:ring-4 focus:ring-blue-400/30 font-['Poppins'] text-lg sm:text-xl mt-6 sm:mt-8"
                                    >
                                        Add Expense
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column - Summary */}
                        <div className="lg:col-span-1">
                            {/* Today's Summary Card */}
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl mb-8">
                                <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins']">
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 font-['Poppins']">
                                    Today's Summary
                                </h2>
                                
                                <div className="space-y-6">
                                    {/* Total Spent */}
                                    <div>
                                        <h3 className="text-white/60 text-sm uppercase tracking-wide mb-2">
                                            Total Spent Today
                                        </h3>
                                        <p className="text-3xl font-bold text-white font-['Poppins']">
                                            $0.00
                                        </p>
                                        <p className="text-white/40 text-sm mt-1">
                                            Transaction Today
                                        <p className="text-2xl sm:text-3xl font-bold text-white font-['Poppins']">
                                            ₹{totalToday.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>

                                    {/* Categories */}
                                    <div>
                                        <h3 className="text-white/60 text-sm uppercase tracking-wide mb-4">
                                            Categories
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Office', 'Utilities'].map((cat) => (
                                                <div key={cat} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                                                    <span className="text-white/80 text-sm">{cat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Expenses */}
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
                                <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins']">
                                    Recent Expenses
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { amount: 200, category: 'Food' },
                                        { amount: 250, category: 'Transport' },
                                        { amount: 260, category: 'Shopping' },
                                        { amount: 2600, category: 'Office' }
                                    ].map((expense, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                            <span className="text-white/60">${expense.amount}</span>
                                            <span className="text-white/80">{expense.category}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10">
                                    <p className="text-white/40 text-sm text-center">
                                        Top four expenses from the account reading
                                    </p>
                                    <p className="text-white/40 text-xs text-center mt-2">
                                        18:38
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 font-['Poppins']">
                                    Recent Expenses
                                </h2>
                                <div className="space-y-4">
                                    {recentExpenses.length > 0 ? (
                                        recentExpenses.map((expense) => (
                                            <div key={expense._id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                                <span className="text-white/60">₹{expense.amount.toFixed(2)}</span>
                                                <span className="text-white/80">{expense.category}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-white/40 text-sm text-center">No recent expenses to show.</p>
                                    )}
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10">
                                    <p className="text-white/40 text-sm text-center">
                                        Your latest transactions
                                    </p>
                                    <p className="text-white/40 text-xs text-center mt-2">
                                        {new Date().toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;