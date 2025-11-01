import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

const AddExpense = () => {
    
    const [note ,setNote] = useState("");
    const [description,setDes] = useState("");
     
    const [formData, setFormData] = useState({
        title: '',
        category: 'Other',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Defaults to today
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const { user } = useContext(AuthContext); // We use 'user' to check if logged in
    const navigate = useNavigate();

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
        const response = await axios.post('http://localhost:5000/api/expenses', formData);

        if (response.status === 201) {
            setMessage('Expense added successfully!');
            // Redirect to the dashboard
            // setTimeout(() => navigate('/'), 1500);
        } else {
            throw new Error(response.data.message || 'Failed to add expense');
        }
    } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred.');
    }
};


    const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#001F3F] to-[#001030] text-white font-inter flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-xl rounded-3xl shadow-[0_0_30px_rgba(47,128,237,0.2)] border border-white/10 p-8">
          <h2 className="text-3xl font-bold font-poppins mb-2 flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(86,204,242,0.6)]">
              +
            </span>{" "}
            Add New Expense
          </h2>
          <p className="text-white/70 mb-8">
            Track your spending by adding transaction details below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-white/90 mb-2 font-medium">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$0"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none transition"
              />
              <div className="flex gap-3 mt-3 text-white/70">
                {["10", "25", "50", "100", "200"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className="px-4 py-1 bg-white/5 rounded-xl border border-white/10 hover:bg-[#2F80ED]/20 transition"
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-white/90 mb-2 font-medium">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
              >
                <option className="bg-[#001030] text-white/70">
                  Select a category
                </option>
                <option className="bg-[#001030] text-white">Food & Dining</option>
                <option className="bg-[#001030] text-white">Transportation</option>
                <option className="bg-[#001030] text-white">Shopping</option>
                <option className="bg-[#001030] text-white">Entertainment</option>
                <option className="bg-[#001030] text-white">Others</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-white/90 mb-2 font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-white/90 mb-2 font-medium">Note</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g., Lunch at restaurant"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white/90 mb-2 font-medium">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any additional details..."
                rows="3"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 font-semibold rounded-xl bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white hover:shadow-[0_0_20px_rgba(86,204,242,0.5)] transition-all duration-300"
            >
              Add Expense
            </button>
          </form>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_0_25px_rgba(47,128,237,0.15)]">
            <h3 className="text-xl font-semibold font-poppins text-white mb-4">
              Today’s Summary
            </h3>
            <p className="text-white/60 text-sm">Total Spent Today</p>
            <p className="text-3xl font-bold text-[#56CCF2] mb-1">$0.00</p>
            <p className="text-white/60 text-sm">Transactions Today: 0</p>
          </div>

          {/* Categories */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_0_25px_rgba(47,128,237,0.15)]">
            <h3 className="text-xl font-semibold font-poppins text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Food & Dining", color: "text-[#56CCF2]" },
                { name: "Transportation", color: "text-[#2F80ED]" },
                { name: "Shopping", color: "text-[#6DD5FA]" },
                { name: "Entertainment", color: "text-[#4AA3F2]" },
                { name: "Others", color: "text-white/70" },
              ].map((cat, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition"
                >
                  <span className={`font-medium ${cat.color}`}>{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tip */}
          <div className="bg-gradient-to-r from-[#2F80ED]/10 to-[#56CCF2]/10 border border-[#2F80ED]/20 rounded-2xl p-4">
            <p className="text-sm text-white/80">
              💡 <span className="font-medium text-[#56CCF2]">Pro Tip:</span> Add
              expenses as soon as they occur for accurate tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default AddExpense;