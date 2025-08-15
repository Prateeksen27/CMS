import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import Dashboard from './pages/Dashboard';

function App() {
  const {user} = useAuthStore()

  return (
    <>
    <Toaster />
    <Router>
        <Routes>
         <Route path='/' element={user? <Navigate to="/dashboard" /> : <Login />} />
         <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />} />
         <Route path='/login' element={user ? <Navigate to="/dashboard" /> : <Login />} />
         <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
