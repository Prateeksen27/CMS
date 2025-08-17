import { useState } from "react";
import { IconBrandGoogle, IconBrandX, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("admin")
  const { login } = useAuthStore()
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!username || !password){
      toast.error('Please fill all the fields!')
    }else{
      login(username, password, role)
    }
    
    
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center w-full max-w-lg px-8 py-12 mx-auto bg-white">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-800 text-title-sm sm:text-title-md">
            Welcome to CMS Portal
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your Username and password to sign in!
          </p>
        </div>


        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </span>
            </div>
          </div>
          {/* Role Select */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition" value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <a href="/reset-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Sign in
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* Right Section */}
      <div className="hidden w-1/2 bg-[#0d1440] md:flex flex-col items-center justify-center relative">
        <div className="text-center">
          <h2 className="flex items-center justify-center gap-2 text-3xl font-bold text-white">
            <span className="px-2 py-1 bg-blue-600 rounded-md">📊</span> TailAdmin
          </h2>
          <p className="mt-2 text-gray-300">
            Free and Open-Source Tailwind CSS Admin <br /> Dashboard Template
          </p>
        </div>


      </div>
    </div>
  );
}
