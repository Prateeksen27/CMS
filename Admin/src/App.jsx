import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Login from './pages/Login'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import Dashboard from './pages/Dashboard';
import Swal from 'sweetalert2';
function App() {
  const {user} = useAuthStore()
  return (
    <MantineProvider>
    <Toaster />
    <Router>
        <Routes>
         <Route path='/' element={user? <Navigate to="/dashboard" /> : <Login />} />
         <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />} />
         <Route path='/login' element={user ? <Navigate to="/dashboard" /> : <Login />} />
         <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    </Router>
    </MantineProvider>
  )
}

export default App
