<<<<<<< HEAD
import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import Login from './pages/Login'
import Register from './pages/Signup'
import {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import LoginPage from './pages/Login'
function App() {
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; 
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AddExpense from './pages/AddExpense';
>>>>>>> 58eef7d640f81a35022d5904370199dd9d335d80

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
    <Routes>
       <Route path='Login' element={<LoginPage/>}></Route>
       <Route path='SignUp' element={<Register/>}></Route>
    </Routes>
  
    </BrowserRouter>
  )
=======
    <PrimeReactProvider>

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddExpense />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </PrimeReactProvider>
  );
>>>>>>> 58eef7d640f81a35022d5904370199dd9d335d80
}

export default App;
