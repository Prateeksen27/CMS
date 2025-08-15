import React, { useState } from 'react'
import background from '../assets/back.png'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState(""); // NEW state for role
  const {login} = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    if(username === "" || password === "" || role === ""){
      toast.error("Please fill in all fields");
      return;
    }
    login(username, password, role); // Pass role to login

    setUsername("");
    setPassword("");
    setRole("");
  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="text-white bg-gray-900/40 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Welcome to CMS Portal
          </h1>
          <h2 className="text-xl font-semibold text-center mb-6">
            Sign in to your account
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Your Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Select Role
              </label>
              <select
                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">-- Select Role --</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-white hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            >
              Log in to your account
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
