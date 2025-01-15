import React, { useEffect, useState } from 'react';
import '../App.css';
import { HiMenuAlt4 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { IoCallOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [sign, setSign] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check for token in localStorage to determine if the user is logged in
    useEffect(() => {
        const token = localStorage.getItem("user");
        setIsLoggedIn(!!token); // Update isLoggedIn based on token presence
    }, []);

    // Handle user logout
    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/user/logout", {
                withCredentials: true,
            });
            console.log(response.data);
            toast.success(response.data.message);

            // Clear token from localStorage
            localStorage.removeItem("user");

            // Update state and redirect to login page
            setIsLoggedIn(false);
            setSign(false); // Ensure the button shows "Sign In"
            window.location.href = "/login"; // Redirect to login page
        } catch (error) {
            console.error("Error in logout", error);
            toast.error(error.response?.data?.errors || "Error in logging out");
        }
    };

    // Toggle between Sign In and Sign Up
    const signBtn = () => {
        setSign(!sign);
    };

    // Toggle the dropdown menu on small screens
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full flex justify-between items-center py-4 px-6 sm:px-20 bg-transparent text-white transition-all duration-500">
            <div className="flex justify-center items-center gap-2">
                <img src="/logo.webp" alt="logo" className="w-6" />
                <Link to={'/'} className="font-mono cursor-pointer">Sheryians Coding School</Link>
            </div>

            {/* Hamburger Icon (visible on small devices) */}
            <div className="sm:hidden flex justify-center items-center gap-2">
                <IoCallOutline className='text-xl font-bold' />
                <button onClick={toggleMenu} className="text-white">
                    <HiMenuAlt4 className='text-3xl' />
                </button>
            </div>

            {/* Normal Menu (visible only on medium and larger screens) */}
            <div className="hidden md:flex justify-center items-center space-x-10 tracking-tight">
                <ul className="capitalize flex justify-center items-center space-x-10 tracking-tight">
                    <Link to={'/'} className="cursor-pointer">Home</Link>
                    <Link to={'/courses'} className="cursor-pointer">Courses</Link>
                    <Link to={'/livecourse'} className="wiggle font-mono text-red-500 font-semibold tracking-wide cursor-pointer animate 1s ease-in-out infinite">
                        Live Course
                    </Link>
                    <li className="cursor-pointer">Request Callback</li>
                    {isLoggedIn ? (
                        // Show Logout button if user is logged in
                        <button
                            className="bg-[#24cfa6] w-20 py-1 rounded-md text-black"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        // Toggle between Sign In and Sign Up if user is not logged in
                        <Link to={sign ? '/signup' : '/login'}>
                            <button
                                className="bg-[#24cfa6] w-20 py-1 rounded-md text-black"
                                onClick={signBtn}
                            >
                                {sign ? "Sign Up" : "Sign In"}
                            </button>
                        </Link>
                    )}
                </ul>
            </div>

            {/* Dropdown Menu for Small Devices */}
            <div
                className={`sm:hidden bg-black fixed top-0 left-0 w-full h-screen z-10 transform transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0 opacity-100 " : "translate-x-full opacity-0"}`}
            >
                <div className="flex justify-between items-center px-10 py-5 text-3xl">
                    <h1>Menu</h1>
                    <button onClick={toggleMenu} className="text-white">
                        <RxCross2 className='text-3xl' />
                    </button>
                </div>
                <hr />
                <ul className="flex flex-col justify-center space-y-4 py-10 px-10 text-gray-400 text-2xl">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">Courses</li>
                    <li className="wiggle font-mono text-red-500 font-semibold tracking-wide cursor-pointer animate 1s ease-in-out infinite">
                        Live Course
                    </li>
                    {isLoggedIn ? (
                        <li onClick={() => {
                            handleLogout();
                            toggleMenu(); // Close the menu after logging out 
                        }}
                            className="cursor-pointer">
                            Logout
                        </li>
                    ) : (
                        <li>
                            <Link
                                to={sign ? '/signup' : '/login'}
                                onClick={() => {
                                    toggleMenu(); // Close the menu when navigating
                                }}
                                className="cursor-pointer"
                            >
                                {sign ? "Sign Up" : "Sign In"}
                            </Link>
                        </li>
                    )}

                </ul>
            </div>
        </div>
    );
}

export default Navbar;
