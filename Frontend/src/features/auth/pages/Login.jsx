import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {handleLogin , loading} = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        await handleLogin({email, password})
        navigate("/");
    }

    if (loading) {
        return (
          <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
            <h1 className="text-3xl font-bold text-white mb-6">
              Loading...
            </h1>
          </div>
        );
      }
      
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">

        <h1 className="text-3xl font-bold text-white mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
            
          <div>
            <label
              htmlFor="email"
              className="block text-white font-semibold text-sm mb-2"
            >
              Email
            </label>

            <input
            onChange={(e)=>setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="w-full h-12 rounded-xl bg-white px-4 text-black placeholder-gray-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-white font-semibold text-sm mb-2"
            >
              Password
            </label>

            <input
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="w-full h-12 rounded-xl bg-white px-4 text-black placeholder-gray-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-3 cursor-pointer rounded-xl bg-[#ec0057] text-white font-semibold hover:bg-[#d6004f] transition"
          >
            Login
          </button>
          <p className="text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
             <Link to="/register" className="text-[#ec0057] font-semibold hover:underline">
           Register
  </Link>
</p>
        </form>
      </div>
    </div>
  );
};

export default Login;


