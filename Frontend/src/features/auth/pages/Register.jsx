import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await handleRegister({
      username,
      email,
      password,
    });

    if (data?.user) {
      navigate("/");
    } else {
      alert("Registration failed. Please check your details.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <h1 className="text-3xl font-bold text-white mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="username"
              className="block text-white font-semibold text-sm mb-2"
            >
              Username
            </label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Enter User-Name"
              className="w-full h-12 rounded-xl bg-white px-4 text-black placeholder-gray-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-white font-semibold text-sm mb-2"
            >
              Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Register
          </button>

          <p className="text-gray-400 text-sm mt-6">
            Have an account?{" "}
            <Link
              to="/login"
              className="text-[#ec0057] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
