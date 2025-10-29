import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import Login from './pages/Login'
//import Signup from './pages/Signup'
import {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import LoginPage from './pages/Login'
function App() {

  return (
    <BrowserRouter>
    <Routes>
       <Route path='Login' element={<LoginPage/>}></Route>
    </Routes>
  
    </BrowserRouter>
  )
}

export default App
