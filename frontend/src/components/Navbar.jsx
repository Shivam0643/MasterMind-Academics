import React, { useEffect, useState } from "react";
import "../App.css";
import { HiMenuAlt4 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { IoCallOutline } from "react-icons/io5";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [sign, setSign] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("user"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !user.token) {
                console.warn("No user or token found in localStorage.");
                toast.error("User not logged in");
                return;
            }

            const token = user.token;

            await axios.post(
                `${BACKEND_URL}/user/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            localStorage.removeItem("user");
            delete axios.defaults.headers.common["Authorization"];
            setIsLoggedIn(false);
            toast.success("Logged out successfully");
            navigate("/login");

        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    const activeLinkStyle = ({ isActive }) =>
        isActive ? "text-[#24cfa6] transition duration-300" : "transition duration-300 hover:text-[#24cfa6]";

    return (
        <div className="w-full flex justify-between items-center py-4 px-6 sm:px-20 bg-transparent text-white transition-all duration-500">
            <Link to={"/"} className="flex justify-center items-center gap-2 cursor-pointer" onClick={(e) => {
                if (window.location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            }}>
                <div className="text-3xl font-bold">
                    <span>M</span>
                    <span className="text-[#24cfa6]">A</span>
                </div>
                <span className="tracking-wider font-semibold">MasterMind Academix</span>
            </Link>

            <div className="sm:hidden flex justify-center items-center gap-2">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                    <HiMenuAlt4 className="text-3xl" />
                </button>
            </div>

            <div className="hidden md:flex justify-center items-center space-x-10 tracking-tight">
                <ul className="capitalize flex justify-center items-center space-x-10 tracking-tight">
                    <NavLink to={'/admin/login'} className="border border-gray-600 px-4 py-2 rounded-full text-sm">Admin Panel</NavLink>
                    <NavLink to={"/"} className={activeLinkStyle} onClick={(e) => {
                        if (window.location.pathname === "/") {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}>Home</NavLink>
                    <NavLink to={"/courses"} className={activeLinkStyle}>Courses</NavLink>
                    <NavLink to={"/purchase"} className={activeLinkStyle}>Purchased</NavLink>
                    <NavLink to={"/livecourses"} className={activeLinkStyle + " wiggle font-mono text-red-500 font-semibold tracking-wide"}>Live Course</NavLink>
                    {isLoggedIn ? (
                        <button className="bg-[#24cfa6] w-20 py-1 rounded-md text-black" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <NavLink to={sign ? "/signup" : "/login"}>
                            <button className="bg-[#24cfa6] w-20 py-1 rounded-md text-black" onClick={() => setSign(!sign)}>
                                {sign ? "Sign Up" : "Sign In"}
                            </button>
                        </NavLink>
                    )}
                </ul>
            </div>

            <div className={`sm:hidden bg-black fixed top-0 left-0 w-full h-screen z-10 transition-all duration-500 ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                <div className="flex justify-between items-center px-10 py-5 text-3xl">
                    <h1>Menu</h1>
                    <button onClick={() => setIsOpen(false)} className="text-white">
                        <RxCross2 className="text-3xl" />
                    </button>
                </div>
                <hr />
                <ul className="flex flex-col justify-center space-y-4 py-10 px-10 text-gray-400 text-2xl">
                    <NavLink to={"/"} className={activeLinkStyle} onClick={(e) => {
                        setIsOpen(false);
                        if (window.location.pathname === "/") {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}>Home</NavLink>
                    <NavLink to={"/courses"} className={activeLinkStyle} onClick={() => setIsOpen(false)}>Courses</NavLink>
                    <NavLink to={"/purchase"} className={activeLinkStyle} onClick={() => setIsOpen(false)}>Purchased</NavLink>
                    <NavLink to={"/livecourses"} className={activeLinkStyle + " wiggle font-mono text-red-500 font-semibold tracking-wide"} onClick={() => setIsOpen(false)}>
                        Live Course
                    </NavLink>
                    {isLoggedIn ? (
                        <li className="cursor-pointer" onClick={async () => {
                            await handleLogout();
                            setIsOpen(false);
                        }}>
                            Logout
                        </li>
                    ) : (
                        <li>
                            <NavLink to={sign ? "/signup" : "/login"} onClick={() => setIsOpen(false)} className={activeLinkStyle}>
                                {sign ? "Sign Up" : "Sign In"}
                            </NavLink>
                        </li>
                    )}
                    <NavLink to={'/admin/login'} className="border border-gray-600 px-4 py-2 rounded-full text-sm w-fit bg-[#24cfa6] text-black font-semibold">Admin Panel</NavLink>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
