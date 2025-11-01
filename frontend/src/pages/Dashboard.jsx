import React, { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx';
import Logout from '../components/Logout';
import { Pencil } from 'lucide-react';
const Dashboard = () => {
  const [data, setdata] = useState([])
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    const fetchExpenses = async () => {
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
  }, [])
  
  

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-zinc-800 text-center flex-col gap-4">
        <h1 className='text-4xl text-white'>Welcome, {user.name}!</h1>
        <a href="/add"><button className='cursor-pointer border border-white p-3 rounded-md text-blue-500'>Add Expenses</button></a>
        <Logout />
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Note
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Edit
                </th>
            </tr>
        </thead>
            <tbody>
               {data.length > 0 ? (
    data.map(expense => (
      <tr key={expense._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {expense.title}
        </th>
        <td className="px-6 py-4">{expense.category}</td>
        <td className="px-6 py-4">{expense.amount}</td>
        <td className="px-6 py-4">{expense.date.split('T')[0]}</td>
        <td className="px-6 py-4"><a href={`/edit/${expense._id}`}><Pencil className='text-xs'/></a></td>
      </tr>
    ))
  ) : (
    <tr><td colSpan="4" className="text-center py-4">No expenses yet</td></tr>
  )}
            
            
            
        </tbody>
    </table>
</div>

      </div>
    </>
  )
}

export default Dashboard