import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx';
import Logout from '../components/Logout';
import { Pencil, TrendingUp, PieChart, Brain, Plus, ArrowRight } from 'lucide-react';
import {Trash, Pencil, TrendingUp, PieChart, Brain, Plus, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [data, setdata] = useState([])
  const { user } = useContext(AuthContext);
  const [totalSpent, setTotalSpent] = useState(0);
  const [categorySpending, setCategorySpending] = useState({});
  const [highestCategory, setHighestCategory] = useState({ category: 'No data', amount: 0 });

  if (!user) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return; // Don't fetch if the user is not loaded yet

      try {
        const response = await fetch('http://localhost:5000/api/expenses', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        setdata(data);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchExpenses();
  }, []);

  // Calculate summary data
  const totalSpent = data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const categorySpending = data.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});
  
  const highestCategory = Object.entries(categorySpending).reduce((max, [category, amount]) => 
    amount > max.amount ? { category, amount } : max, 
    { category: 'No data', amount: 0 }
  );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        setdata(fetchedData);

        // Calculate summary data and update state
        const total = fetchedData.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        setTotalSpent(total);

        const spendingByCategory = fetchedData.reduce((acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
          return acc;
        }, {});
        setCategorySpending(spendingByCategory);

        const maxCategory = Object.entries(spendingByCategory).reduce((max, [category, amount]) =>
          amount > max.amount ? { category, amount } : max,
          { category: 'No data', amount: 0 }
        );
        setHighestCategory(maxCategory);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchExpenses();
  }, [user]); // Re-run this effect when the user object is available

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (response.ok) {
          setdata(prevData => prevData.filter(expense => expense._id !== id));
        } else {
          console.error('Failed to delete expense');
        }
      } catch (error) {
        console.error('There was a problem with the delete operation:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] to-[#001030] font-['Inter']">
      {/* 🧭 Top Navigation Bar */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Avatar */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{user.name?.charAt(0)}</span>
              </div>
              <span className="text-white font-['Poppins'] text-xl font-bold">ExpenseTracker</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/dashboard" className="text-white/90 hover:text-white transition-colors duration-200 font-medium">Dashboard</a>
              <a href="/transactions" className="text-white/70 hover:text-white transition-colors duration-200">Transactions</a>
              <a href="/add" className="bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white px-6 py-2 rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-200 font-medium">
                Add Expense
              </a>
            </div>

            {/* Logout */}
            <Logout />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-['Poppins']">
            Welcome back, {user.name}!
          </h1>
          <p className="text-white/60 text-lg">Here's your spending overview</p>
        </div>

        {/* 📊 Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Spent Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/80 text-sm uppercase tracking-wide">Total Spent This Month</h3>
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#2F80ED]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white font-['Poppins'] mb-2">
              ${totalSpent.toFixed(2)}
              ₹{totalSpent.toFixed(2)}
            </p>
            <p className="text-white/40 text-sm">Across {data.length} transactions</p>
          </div>

          {/* Highest Spending Category */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/80 text-sm uppercase tracking-wide">Highest Spending Category</h3>
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <PieChart className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white font-['Poppins'] mb-2">
              {highestCategory.category}
            </p>
            <p className="text-white/40 text-sm">${highestCategory.amount.toFixed(2)} spent</p>
            <p className="text-white/40 text-sm">₹{highestCategory.amount.toFixed(2)} spent</p>
          </div>

          {/* AI Prediction */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/80 text-sm uppercase tracking-wide">AI Predicted Next Month</h3>
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white font-['Poppins'] mb-2">
              ${(totalSpent * 1.1).toFixed(2)}
              ₹{(totalSpent * 1.1).toFixed(2)}
            </p>
            <p className="text-white/40 text-sm">Based on your spending pattern</p>
          </div>
        </div>

        {/* Analytics & AI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Analytics Charts - Left 2/3 */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h3 className="text-white font-bold mb-4 font-['Poppins']">Category Distribution</h3>
              <div className="space-y-3">
                {Object.entries(categorySpending).slice(0, 5).map(([category, amount], index) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">{category}</span>
                    <span className="text-white font-medium">${amount.toFixed(2)}</span>
                    <span className="text-white font-medium">₹{amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending Trend */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h3 className="text-white font-bold mb-4 font-['Poppins']">Spending Trend</h3>
              <div className="text-white/60 text-sm">
                <p>Weekly average: ${(totalSpent / 4).toFixed(2)}</p>
                <p>Weekly average: ₹{(totalSpent / 4).toFixed(2)}</p>
                <p className="mt-2">Peak spending day: Friday</p>
              </div>
            </div>
          </div>

          {/* 🤖 AI Insights - Right 1/3 */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl h-full">
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-[#2F80ED] mr-3" />
                <h3 className="text-white font-bold font-['Poppins']">AI Financial Advisor</h3>
              </div>
              <p className="text-white/70 text-sm mb-6">
                Based on your spending patterns, consider setting a budget for {highestCategory.category} to optimize your savings.
              </p>
              <button className="w-full bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white font-medium rounded-xl py-3 px-4 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                Ask AI to Predict Next Month
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* 📋 Recent Transactions Table */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white font-['Poppins']">Recent Transactions</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-white/80 text-sm font-medium uppercase tracking-wide">Date</th>
                  <th className="text-left py-4 px-6 text-white/80 text-sm font-medium uppercase tracking-wide">Category</th>
                  <th className="text-left py-4 px-6 text-white/80 text-sm font-medium uppercase tracking-wide">Amount</th>
                  <th className="text-left py-4 px-6 text-white/80 text-sm font-medium uppercase tracking-wide">Note</th>
                  <th className="text-left py-4 px-6 text-white/80 text-sm font-medium uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.slice(0, 5).map(expense => (
                    <tr key={expense._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                      <td className="py-4 px-6 text-white/90">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {new Date(expense.date).toLocaleDateString('en-GB')}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex text-center items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white font-medium">
                        ${parseFloat(expense.amount).toFixed(2)}
                        ₹{parseFloat(expense.amount).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-white/70">
                        {expense.title}
                      </td>
                      <td className="py-4 px-6">
                        <a 
                          href={`/edit/${expense._id}`}
                          className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
                        >
                          <Pencil className="w-4 h-4 text-white/70" />
                        </a>
                          className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 mr-3"
                        >
                          <Pencil className="w-4 h-4 text-white/70" />
                        </a>
                        <button 
                          onClick={() => handleDelete(expense._id)}
                          className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
                        >
                          <Trash className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 px-6 text-center text-white/60">
                      No expenses yet. <a href="/add" className="text-[#2F80ED] hover:underline">Add your first expense</a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {data.length > 5 && (
            <div className="px-6 py-4 border-t border-white/10">
              <button className="w-full bg-white/5 hover:bg-white/10 text-white/80 py-3 rounded-xl transition-colors duration-200 font-medium">
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard