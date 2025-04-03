import React, { useState } from "react";
import { FaHome, FaBook, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineVideoSettings } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { HiMenuAlt4 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Dashboard() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Handle user logout
    const handleLogout = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/admin/logout`, {
                withCredentials: true,
            });
            console.log(response.data);
            toast.success(response.data.message);

            // Clear token from localStorage
            localStorage.removeItem("admin");

            navigate('/admin/login')
        } catch (error) {
            console.error("Error in logout", error);
            toast.error(error.response?.data?.errors || "Error in logging out");
        }
    };

    return (
        <div className="flex h-screen bg-[#0c0c0c] text-white relative">
            {/* Sidebar */}
            <div className={`fixed top-0 right-0 w-full h-screen bg-[#171717] flex flex-col space-y-6 px-4 py-6 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out sm:w-64 sm:relative sm:translate-x-0`}>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
                    <button className="md:hidden text-white" onClick={() => setIsOpen(false)}>
                        <RxCross2 className="text-3xl" />
                    </button>
                </div>
                <nav className="flex flex-col space-y-4 text-sm md:text-base">
                    <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold">
                        <FaHome /> <span>Home</span>
                    </Link>
                    <Link to="/admin/ourcourses" className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold">
                        <FaBook /> <span>Our Courses</span>
                    </Link>
                    <Link to="/admin/createcourse" className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold">
                        <FaPlusCircle /> <span>Create Course</span>
                    </Link>
                    <Link to="/admin/lectures" className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold">
                        <MdOutlineVideoSettings /> <span>Manage Lectures</span>
                    </Link>
                    <Link to="/admin/quizzes" className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold">
                        <MdManageHistory /> <span>Quiz Management</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center space-x-2 p-2 hover:bg-red-600 rounded font-semibold">
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </nav>
            </div>

            {/* Hamburger Icon for Mobile */}
            {!isOpen && (
                <button className="sm:hidden fixed top-4 right-4 text-white z-50" onClick={() => setIsOpen(true)}>
                    <HiMenuAlt4 className="text-3xl" />
                </button>
            )}

            {/* Static Content */}
            <div className="flex-1 p-6 sm:mr-64">
                <h2 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard!</h2>
                <p className="mb-4">
                    This is the admin dashboard where you can manage courses, create new content,
                    and monitor other activities. Use the sidebar to navigate through different
                    options.
                </p>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Our Courses</h3>
                        <p>View and manage all the courses in the system.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Create Course</h3>
                        <p>
                            Use the "Create Course" option in the sidebar to add new courses with
                            details like title, description, and price.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Manage Lectures</h3>
                        <p>
                            Use the "Manage Lectures" option in the sidebar to add, update, or delete lectures for a course. You can include details like title, description, and video content.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quiz Management</h3>
                        <p>
                            Use the 'Manage Quizzes' option in the sidebar to add, update, or delete quizzes for a course. You can include details like questions, options, and correct answers.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Logout</h3>
                        <p>Click "Logout" to exit the admin dashboard securely.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;