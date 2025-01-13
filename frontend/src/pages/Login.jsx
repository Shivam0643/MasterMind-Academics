import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { AiOutlineUserAdd } from "react-icons/ai";

function Login() {
  const [pass, setPass] = useState(false);

  const togglePasswordVisibility = () => {
    setPass(!pass);
  };

  return (
    <>
      <div className="flex flex-col bg-black h-screen transition-all duration-500 gap-10 md:gap-0">
        {/* Navbar */}
        <div>
          <Navbar />
        </div>

        {/* Login Form */}
        <div className="flex justify-center items-center md:h-full">
          <form className="flex flex-col bg-black text-white w-full max-w-md p-4 rounded-md space-y-10">
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
                  className="bg-[#24cfa6] hover:bg-[#2bf1c3] duration-500 px-4 py-1 rounded-full text-black font-semibold font-mono"
                >
                  Continue
                </button>
              </div>
            </div>
            <div className='flex justify-center items-center w-full gap-2'>
              <div className='border border-gray-500 w-full h-0'></div>
              <span className='text-gray-300'>or</span>
              <div className='border border-gray-500 w-full h-0'></div>
            </div>
            <div className='flex justify-center items-center'>
              <Link to={'/signup'} className='flex justify-center items-center gap-4 border border-gray-500 py-2 md:py-4 rounded-full w-full text-base md:text-lg tracking-wide hover:scale-105 duration-500 cursor-pointer'><AiOutlineUserAdd className='text-xl md:text-2xl' />Create a New Account</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
