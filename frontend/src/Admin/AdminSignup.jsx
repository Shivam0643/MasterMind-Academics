import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminSignup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/v1/admin/signup', {
                firstName,
                lastName,
                email,
                password
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log("Signup successfully", response.data);
            toast.success(response.data.message)
            navigate('/admin/login')
        } catch (error) {
            if (error.response) {

                setErrorMessage(error.response.data.errors || "Failed to SignUp")
            }
        }
    }



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
                {/* Signup Form */}
                <div className="flex justify-center sm:items-center md:items-start md:h-full relative">
                    <form onSubmit={handleSubmit} className="flex flex-col text-white w-full max-w-md p-6 md:p-4 rounded-md space-y-4 md:space-y-10 ">
                        <div className='flex flex-col justify-center flex-nowrap gap-1'>
                            <h1 className="text-3xl font-semibold font-mono">Admin SignUp</h1>
                            <p className='flex flex-nowrap text-gray-500 text-sm gap-1'>Already have an account? <Link to={'/admin/login'} className='font-mono text-blue-600 cursor-pointer'>Admin SignIn</Link></p>
                        </div>
                        <div className="flex flex-col gap-6 md:gap-8 ">
                            {/* First Name */}
                            <div className="flex flex-col space-y-2 ">
                                <span className="text-gray-400 text-sm">First Name</span>
                                <input
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm transition-all duration-500"
                                />
                            </div>
                            {/* Last Name */}
                            <div className="flex flex-col space-y-2 ">
                                <span className="text-gray-400 text-sm">Last Name</span>
                                <input
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm transition-all duration-500"
                                />
                            </div>
                            {/* Email Field */}
                            <div className="flex flex-col space-y-2 ">
                                <span className="text-gray-400 text-sm">Email address</span>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="text"
                                    placeholder="Enter your email address"
                                    className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm transition-all duration-500"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col space-y-2 ">
                                <span className="text-gray-400 text-sm">Password</span>
                                <div className="relative">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        type={pass ? 'text' : 'password'}
                                        placeholder="Enter your password here"
                                        className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm w-full transition-all duration-500"
                                    />

                                    <button
                                        type='button'
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 hover:text-white transition-all duration-300"
                                    >
                                        {pass ? <LuEye /> : <LuEyeClosed />}
                                    </button>
                                </div>
                            </div>
                            {errorMessage && (
                                <div className=' text-red-500 text-center transition-all duration-500 md:text-base text-sm'>
                                    {errorMessage}
                                </div>
                            )}
                            {/* Continue Button */}
                            <div className="w-full flex justify-end items-center transition-all duration-500">
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

export default AdminSignup;
