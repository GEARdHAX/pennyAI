import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; 
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';

function App() {
  return (
    <PrimeReactProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/edit/:id" element={<EditExpense />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </PrimeReactProvider>
  );
}

export default App;