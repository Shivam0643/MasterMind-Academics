import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils';

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPassVisible(!passVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BACKEND_URL}/admin/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ Save token in localStorage (or cookies)
      localStorage.setItem("adminToken", res.data.token);
      console.log(localStorage.getItem("adminToken"));
      // If you're storing more admin data
      localStorage.setItem("adminData", JSON.stringify(res.data));
      toast.success(res.data.message || "Login successful");
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.errors ||
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col bg-black h-screen transition-all duration-500 gap-10 md:gap-0">
        {/* Navbar */}
        <Navbar />

        {/* Login Form */}
        <div className="flex justify-center items-center md:h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-black text-white w-full max-w-md p-4 rounded-md space-y-10"
          >
            <h1 className="text-3xl font-semibold font-mono">Admin SignIn</h1>

            <div className="flex flex-col gap-10">
              {/* Email Field */}
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400 text-sm">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm transition-all duration-500"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400 text-sm">Password</span>
                <div className="relative">
                  <input
                    type={passVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password here"
                    className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm w-full transition-all duration-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 hover:text-white transition-all duration-300"
                  >
                    {passVisible ? <LuEye /> : <LuEyeClosed />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-end items-center">
                <button
                  type="submit"
                  className="bg-[#24cfa6] hover:bg-[#2bf1c3] duration-500 px-4 py-1 rounded-full text-black font-semibold font-mono"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
