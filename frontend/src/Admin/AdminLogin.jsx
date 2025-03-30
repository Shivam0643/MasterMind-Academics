import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils';

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BACKEND_URL}/admin/login`, {
                email,
                password,
            }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            console.log("Admin Login successful", response.data);

            const adminData = {
                token: response.data.token,
                email: response.data.admin.email,
                role: "admin",
            };
            localStorage.setItem("admin", JSON.stringify(adminData));

            // ✅ Verify immediately after setting
            console.log("🔹 Stored in LocalStorage:", localStorage.getItem("admin"));

            toast.success(response.data.message);

            setTimeout(() => navigate("/admin/dashboard", { replace: true }), 100);
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage(error.response?.data?.message || "Failed to Login");
        }
    };


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
                    <form onSubmit={handleSubmit} className="flex flex-col bg-black text-white w-full max-w-md p-4 rounded-md space-y-10">
                        <h1 className="text-3xl font-semibold font-mono">Admin SignIn</h1>
                        <div className="flex flex-col gap-10">
                            {/* Email Field */}
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400 text-sm">Email address</span>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="text"
                                    placeholder="Enter your email address"
                                    className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm transition-all duration-500"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col space-y-2 relative">
                                <span className="text-gray-400 text-sm">Password</span>
                                <div className="relative">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        type={pass ? 'text' : 'password'}
                                        placeholder="Enter your password here"
                                        className="py-1 px-2 md:py-2 md:px-4 bg-[#1d1d1d] border-b border-gray-500 rounded text-sm w-full transition-all duration-500"
                                        required
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
                            {errorMessage && (
                                <div className="text-red-500 text-center transition-all duration-500 md:text-base text-sm">
                                    {errorMessage}
                                </div>
                            )}
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
                        <div className="flex justify-center items-center w-full gap-2">
                            <div className="border border-gray-500 w-full h-0"></div>
                            <span className="text-gray-300">or</span>
                            <div className="border border-gray-500 w-full h-0"></div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Link
                                to={'/admin/signup'}
                                className="flex justify-center items-center gap-4 border border-gray-500 py-2 md:py-4 rounded-full w-full text-base md:text-lg tracking-wide hover:scale-105 duration-500 cursor-pointer"
                            >
                                <AiOutlineUserAdd className="text-xl md:text-2xl" />
                                Create New Admin
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;
