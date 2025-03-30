import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${BACKEND_URL}/user/login`, {
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login response:", response); // Debug the full response

      // Safely access response data
      const { token, user, message } = response.data;

      if (!token) {
        throw new Error("No token received in response");
      }

      // Store user data - make sure all fields exist
      const userData = {
        token: token,
        _id: user._id,
        email: user?.email || email, // Fallback to form email if user object missing
        // Add other necessary user data
      };

      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      toast.success(message || "Login successful");
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      let errorMsg = "An error occurred. Please try again.";
      if (error.response) {
        // Handle different error cases
        if (error.response.status === 401) {
          errorMsg = "Invalid email or password";
        } else {
          errorMsg = error.response.data?.message || errorMsg;
        }
      } else if (error.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPassVisible(!passVisible);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col bg-black h-screen transition-all duration-500 gap-10 md:gap-0">
        <div>
          <Navbar />
        </div>

        <div className="flex justify-center items-center md:h-full">
          <form onSubmit={handleSubmit} className="flex flex-col bg-black text-white w-full max-w-md p-4 rounded-md space-y-10">
            <h1 className="text-3xl font-semibold font-mono">Sign In</h1>
            <div className="flex flex-col gap-10">
              {/* Email Field */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-gray-400 text-sm">Email address</label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email address"
                  className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm transition-all duration-500"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-gray-400 text-sm">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={passVisible ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm w-full transition-all duration-500"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 hover:text-white transition-all duration-300"
                    aria-label={passVisible ? "Hide password" : "Show password"}
                  >
                    {passVisible ? <LuEye /> : <LuEyeClosed />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-center transition-all duration-500 md:text-base text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="w-full flex justify-end items-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-[#24cfa6] hover:bg-[#2bf1c3] duration-500 px-4 py-1 rounded-full text-black font-semibold font-mono ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Logging in...' : 'Continue'}
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center w-full gap-2">
              <div className="border border-gray-500 w-full h-0"></div>
              <span className="text-gray-300">or</span>
              <div className="border border-gray-500 w-full h-0"></div>
            </div>

            <div className="flex justify-center items-center">
              <Link
                to="/signup"
                className="flex justify-center items-center gap-4 border border-gray-500 py-2 md:py-4 rounded-full w-full text-base md:text-lg tracking-wide hover:scale-105 duration-500 cursor-pointer"
              >
                <AiOutlineUserAdd className="text-xl md:text-2xl" />
                Create a New Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;