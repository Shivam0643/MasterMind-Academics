import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { LuEyeClosed, LuEye } from "react-icons/lu";

function Login() {
  const [pass, setPass] = useState(false);

  const togglePasswordVisibility = () => {
    setPass(!pass);
  };

  return (
    <>
      <div className="flex flex-col bg-black h-screen transition-all duration-500">
        {/* Navbar */}
        <div>
          <Navbar />
        </div>

        {/* Login Form */}
        <div className="flex justify-center items-center h-full">
          <form className="flex flex-col bg-black text-white w-full max-w-md p-4 rounded-md space-y-16">
            <h1 className="text-3xl font-semibold font-mono">Sign In</h1>
            <div className="flex flex-col gap-10">
              {/* Email Field */}
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400 text-sm">Email address</span>
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="py-2 px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-lg md:text-sm transition-all duration-500"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col space-y-2 relative">
                <span className="text-gray-400 text-sm">Password</span>
                <div className="relative">
                  <input
                    type={pass ? 'text' : 'password'}
                    placeholder="Enter your password here"
                    className="py-2 px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-lg md:text-sm w-full transition-all duration-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 hover:text-white transition-all duration-300"
                  >
                    {pass ? <LuEye /> : <LuEyeClosed />}
                  </button>
                </div>
              </div>

              {/* Continue Button */}
              <div className="w-full flex justify-end items-center">
                <button
                  type="submit"
                  className="bg-[#24cfa6] px-4 py-1 rounded-full text-black font-semibold font-mono"
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

export default Login;
