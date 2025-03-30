import React, { useEffect, useState } from "react";
import "../App.css";
import { HiMenuAlt4 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { IoCallOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [sign, setSign] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

    // Listen for changes in localStorage to update login state
    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("user"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Handle user logout
    const handleLogout = async () => {
        try {
            // Get user from localStorage
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !user.token) {
                console.warn("No user found in localStorage.");
                toast.error("User not logged in");
                navigate("/login");
                return;
            }

            const token = user.token;

            await axios.post(`${BACKEND_URL}/user/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            // Clear frontend storage and update state
            localStorage.removeItem("user");
            delete axios.defaults.headers.common["Authorization"];
            setIsLoggedIn(false);

            toast.success("Logged out successfully");
            navigate("/login");

        } catch (error) {
            // Handle errors gracefully
            console.error("Logout error:", error);
            toast.success("Logged out successfully"); // Ensure toast message always appears
            localStorage.removeItem("user");
            delete axios.defaults.headers.common["Authorization"];
            setIsLoggedIn(false);
            navigate("/login");
        }
    };


    return (
        <div className="w-full flex justify-between items-center py-4 px-6 sm:px-20 bg-transparent text-white transition-all duration-500">
            <Link to={"/"} className="flex justify-center items-center gap-2 cursor-pointer">
                <div className="text-3xl font-bold">
                    <span>M</span>
                    <span className="text-[#24cfa6]">A</span>
                </div>
                <span className="tracking-wider font-semibold">MasterMind Academix</span>
            </Link>

            {/* Hamburger Icon (Small Devices) */}
            <div className="sm:hidden flex justify-center items-center gap-2">
                <IoCallOutline className="text-xl font-bold" />
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                    <HiMenuAlt4 className="text-3xl" />
                </button>
            </div>

            {/* Main Navbar (Medium and Larger Screens) */}
            <div className="hidden md:flex justify-center items-center space-x-10 tracking-tight">
                <ul className="capitalize flex justify-center items-center space-x-10 tracking-tight">
                    <Link to={"/"} className="cursor-pointer">Home</Link>
                    <Link to={"/courses"} className="cursor-pointer">Courses</Link>
                    <Link to={"/purchase"} className="cursor-pointer">Purchses</Link>
                    <Link to={"/livecourses"} className="wiggle font-mono text-red-500 font-semibold tracking-wide cursor-pointer animate 1s ease-in-out infinite">
                        Live Course
                    </Link>
                    <li className="cursor-pointer">Request Callback</li>
                    {isLoggedIn ? (
                        <button className="bg-[#24cfa6] w-20 py-1 rounded-md text-black" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <Link to={sign ? "/signup" : "/login"}>
                            <button className="bg-[#24cfa6] w-20 py-1 rounded-md text-black" onClick={() => setSign(!sign)}>
                                {sign ? "Sign Up" : "Sign In"}
                            </button>
                        </Link>
                    )}
                </ul>
            </div>

            {/* Mobile Menu */}
            <div className={`sm:hidden bg-black fixed top-0 left-0 w-full h-screen z-10 transition-all duration-500 ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                <div className="flex justify-between items-center px-10 py-5 text-3xl">
                    <h1>Menu</h1>
                    <button onClick={() => setIsOpen(false)} className="text-white">
                        <RxCross2 className="text-3xl" />
                    </button>
                </div>
                <hr />
                <ul className="flex flex-col justify-center space-y-4 py-10 px-10 text-gray-400 text-2xl">
                    <Link to={"/"} className="cursor-pointer" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to={"/courses"} className="cursor-pointer" onClick={() => setIsOpen(false)}>Courses</Link>
                    <Link to={"/livecourses"} className="wiggle font-mono text-red-500 font-semibold tracking-wide cursor-pointer animate 1s ease-in-out infinite" onClick={() => setIsOpen(false)}>
                        Live Course
                    </Link>
                    {isLoggedIn ? (
                        <li className="cursor-pointer" onClick={async () => {
                            await handleLogout();
                            setIsOpen(false);
                        }}>
                            Logout
                        </li>
                    ) : (
                        <li>
                            <Link to={sign ? "/signup" : "/login"} onClick={() => setIsOpen(false)} className="cursor-pointer">
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
