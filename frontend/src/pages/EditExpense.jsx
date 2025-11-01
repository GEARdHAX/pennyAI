import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

const EditExpense = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Other',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Defaults to today
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the expense ID from the URL

    useEffect(() => {
        const fetchExpense = async () => {
            if (!user) return;
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get('http://localhost:5000/api/expenses');
                const expenseToEdit = response.data.find(exp => exp._id === id);

                if (expenseToEdit) {
                    setFormData({
                        title: expenseToEdit.title,
                        category: expenseToEdit.category,
                        amount: expenseToEdit.amount,
                        date: new Date(expenseToEdit.date).toISOString().split('T')[0],
                    });
                } else {
                    setError('Expense not found.');
                }
            } catch (err) {
                setError('Failed to fetch expense data.');
            } finally {
                setLoading(false);
            }
        };
        fetchExpense();
    }, [id, user]);
    const { title, category, amount, date } = formData;

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
        // Use axios which is configured for cookie-based auth
        axios.defaults.withCredentials = true;
        const response = await axios.put(`http://localhost:5000/api/expenses/${id}`, formData);

        if (response.status === 200) {
            setMessage('Expense updated successfully!');
            setTimeout(() => navigate('/'));
        } else {
            throw new Error(response.data.message || 'Failed to add expense');
        }
    } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred.');
    }
    };

    if (loading) {
        return <div className='bg-zinc-800 h-screen flex justify-center items-center text-white'>Loading expense data...</div>;
    }

    const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

    return (
        <div className='bg-zinc-800 h-screen flex justify-center items-center flex-col gap-4 text-white text-center font-semibold text-xl'>
            <h2 className="text-3xl font-bold mb-4">Edit Expense</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <form onSubmit={onSubmit} className="w-full max-w-lg">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="title" className={labelClasses}>Expense Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="e.g., Coffee with friends"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="amount" className={labelClasses}>Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="0.00"
                            required
                            min="0.01"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="category" className={labelClasses}>Category</label>
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={onChange}
                            className={inputClasses}
                        >
                            <option value="Other">Other</option>
                            <option value="Food & Dining">Food & Dining</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Housing">Housing</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Salary">Salary</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className={labelClasses}>Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={onChange}
                            className={inputClasses}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Update Expense
                    </button>
                    <Link to="/" className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default EditExpense;