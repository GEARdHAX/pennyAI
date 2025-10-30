import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import Logout from '../components/Logout';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-zinc-800 text-center flex-col gap-4">
    <h1 className='text-4xl'>Welcome, {user.name}!</h1>
    <Logout />
      </div>
    </>
  )
}

export default Dashboard