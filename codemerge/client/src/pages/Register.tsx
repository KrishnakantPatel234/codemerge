import React, { useState } from 'react'
import { FaCodeMerge } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.hooks';

const Register = () => {

  const auth = useAuth();
  const navigate = useNavigate()
  const [formData , setFormData] = useState({
    displayName : "",
    email : "",
    password : ""
  })

  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await auth?.register(formData);
    if(success){
      navigate("/dashboard");
    }
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const {name , value} = e.target;
    setFormData({
      ...formData ,
      [name] : value
    })
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-8">

        <div className="flex flex-col items-center gap-3 mb-8">
          <h1 className="text-4xl md:text-5xl flex gap-2 items-center font-bold text-white">
            <FaCodeMerge />
            CodeMerge
          </h1>

          <p className="text-gray-400">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="text-gray-300">Display Name</label>
            <input
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-300">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-300">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={auth?.loading}
            className="w-full bg-white text-black cursor-pointer font-semibold py-3 rounded-lg mt-3 hover:scale-[1.02] transition-all"
          >
            {auth?.loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Register