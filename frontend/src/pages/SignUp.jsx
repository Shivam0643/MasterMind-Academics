import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { Link } from 'react-router-dom';

function SignUp() {
    const [pass, setPass] = useState(false);

    const togglePasswordVisibility = () => {
        setPass(!pass);
    };

    return (
        <>
            <div className="flex flex-col bg-black h-screen transition-all duration-500 gap-4 md:gap-0">
                {/* Navbar */}
                <div className='relative z-10'>
                    <Navbar />
                </div>
                <div className='md:flex hidden'>
                    <img src="/bg1.svg" alt="" className='absolute md:-top-[17rem] w-full object-contain' />
                </div>
                {/* Login Form */}
                <div className="flex justify-center items-center md:h-full relative">
                    <form className="flex flex-col text-white w-full max-w-md p-4 rounded-md space-y-4 md:space-y-10 ">
                        <div className='flex flex-col flex-nowrap gap-1'>
                            <h1 className="text-3xl font-semibold font-mono">Sign Up</h1>
                            <p className='flex flex-nowrap text-gray-500 text-sm gap-1'>Already have an account? <Link to={'/login'} className='font-mono text-blue-600 cursor-pointer'>Sign in</Link></p>
                        </div>
                        <div className="flex flex-col gap-8 md:gap-10">
                            {/* First Name */}
                            <div className="flex flex-col space-y-2 ">
                                <span className="text-gray-400 text-sm">First Name</span>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="py-2 px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-lg md:text-sm transition-all duration-500"
                                />
                            </div>
                            {/* Last Name */}
                            <div className="flex flex-col space-y-2 ">
                                <span className="text-gray-400 text-sm">Last Name</span>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="py-2 px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-lg md:text-sm transition-all duration-500"
                                />
                            </div>
                            {/* Email Field */}
                            <div className="flex flex-col space-y-2 ">
                                <span className="text-gray-400 text-sm">Email address</span>
                                <input
                                    type="text"
                                    placeholder="Enter your email address"
                                    className="py-2 px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-lg md:text-sm transition-all duration-500"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col space-y-2 ">
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
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
