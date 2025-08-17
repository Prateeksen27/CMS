import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
const Dashboard = () => {
  const {logout} = useAuthStore()

  return (
    <div>Dashboard <button onClick={logout}>Logout</button> </div>
  )
}

export default Dashboard