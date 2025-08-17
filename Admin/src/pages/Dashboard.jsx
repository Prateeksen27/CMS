import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
const Dashboard = () => {
  const {logout} = useAuthStore()

  return (
     <>
     <h1>Hello</h1>
     <button onClick={logout}>Logout</button>
     </>
  )
}

export default Dashboard