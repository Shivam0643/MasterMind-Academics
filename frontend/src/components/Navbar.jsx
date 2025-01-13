import React, { useState } from 'react';
import '../App.css';
import { HiMenuAlt4 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { IoCallOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the menu on click
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full flex justify-between items-center py-4 px-6 sm:px-20 bg-transparent text-white transition-all duration-500">
            <div className="flex justify-center items-center gap-2">
                <img src="/logo.webp" alt="logo" className="w-6" />
                <h1 className="font-mono">Sheryians Coding School</h1>
            </div>

            {/* Hamburger Icon (visible on small devices) */}
            <div className="sm:hidden flex justify-center items-center gap-2">
                <IoCallOutline className='text-xl font-bold' />
                <button onClick={toggleMenu} className="text-white">
                    {isOpen ? (
                        <HiMenuAlt4 className='text-3xl' />
                    ) : (
                        <HiMenuAlt4 className='text-3xl' />
                    )}
                </button>
            </div>

            {/* Normal Menu (visible only on medium and larger screens) */}
            <div className="hidden md:flex justify-center items-center space-x-10 tracking-tight">
                <ul className="capitalize flex justify-center items-center space-x-10 tracking-tight">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">Courses</li>
                    <li className="wiggle font-mono text-red-500 font-semibold tracking-wide cursor-pointer animate 1s ease-in-out infinite">
                        Live Course
                    </li>
                    <li className="cursor-pointer">Request Callback</li>
                    <Link to={'/login'} className="bg-[#24cfa6] px-6 py-1 rounded-md text-black">Sign In</Link>
                </ul>
            </div>

            {/* Dropdown Menu for Small Devices */}
            <div
                className={`sm:hidden bg-black fixed top-0 left-0 w-full h-screen z-10 transform transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0 opacity-100 " : "translate-x-full opacity-0"}`}
            >
                <div className="flex justify-between items-center px-10 py-5 text-3xl">
                    <h1>Menu</h1>
                    <button onClick={toggleMenu} className="text-white transform transition-all duration-500 rotate-90">
                        {isOpen ? (
                            <RxCross2 className='text-3xl transform transition-all duration-500 rotate-90' />
                        ) : (
                            <RxCross2 className='text-3xl transform transition-all duration-500 rotate-90 ' />
                        )}
                    </button>
                </div>
                <hr />
                <ul className="flex flex-col justify-center space-y-4 py-10 px-10 text-gray-400 text-2xl">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">Courses</li>
                    <li className="wiggle font-mono text-red-500 font-semibold tracking-wide cursor-pointer animate 1s ease-in-out infinite">
                        Live Course
                    </li>
                    <li className="cursor-pointer">Sign In</li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
