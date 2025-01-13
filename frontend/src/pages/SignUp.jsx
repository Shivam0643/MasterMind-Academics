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
            <div className="relative min-h-screen bg-black">
                {/* Background Image */}
                <div className='hidden md:flex'>

                    <img
                        src="/bg1.svg"
                        alt="Background Illustration"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                </div>

                {/* Navbar */}
                <div className="absolute top-0 w-full z-10 backdrop-blur-md">
                    <Navbar />
                </div>

                {/* Sign-Up Form */}
                <div className="flex justify-center items-center min-h-screen z-10 relative">
                    <form className=" text-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-8 backdrop-blur-sm">
                        {/* Header */}
                        <div className="">
                            <h1 className="text-3xl font-semibold font-mono">Sign Up</h1>
                            <p className="text-gray-400 mt-2">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-500 hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-6">
                            {/* First Name */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="w-full py-2 px-4 bg-[#1d1d1d] border-b border-gray-500 rounded  transition-all duration-300"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="w-full py-2 px-4 bg-[#1d1d1d] border-b border-gray-500 rounded f transition-all duration-300"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full py-2 px-4 bg-[#1d1d1d] border-b border-gray-500 rounded  transition-all duration-300"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={pass ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="w-full py-2 px-4 bg-[#1d1d1d] border-b border-gray-500 rounded  transition-all duration-300"
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
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full bg-[#24cfa6] hover:bg-[#2bf1c3] py-2 rounded-full text-black font-semibold text-lg transition-all duration-300"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
