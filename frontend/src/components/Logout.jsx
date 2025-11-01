import { useContext,React } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition font-medium border p-3 rounded-md cursor-pointer text-center border-white">Logout</button>
  );
    
};

export default Logout
