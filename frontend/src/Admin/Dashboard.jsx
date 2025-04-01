import React from "react";
import { FaHome, FaBook, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineVideoSettings } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Dashboard() {
    const navigate = useNavigate();
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
        <div className="flex h-screen bg-[#0c0c0c] text-white">
            {/* Sidebar */}
            <div className="w-64 bg-[#171717] h-full flex flex-col space-y-6 px-4 py-6">
                <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
                <nav className="flex flex-col space-y-4 ">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold"
                    >
                        <FaHome /> <span>Home</span>
                    </Link>
                    <Link
                        to="/admin/ourcourses"
                        className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold"
                    >
                        <FaBook /> <span>Our Courses</span>
                    </Link>
                    <Link
                        to="/admin/createcourse"
                        className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold"
                    >
                        <FaPlusCircle /> <span>Create Course</span>
                    </Link>
                    <Link
                        to="/admin/lectures"
                        className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold"
                    >
                        <MdOutlineVideoSettings /> <span>Manage Lectures</span>
                    </Link>
                    <Link
                        to="/admin/quizzes"
                        className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold"
                    >
                        <MdManageHistory /> <span>Quiz Management</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 p-2 hover:bg-red-600 rounded  font-semibold"
                    >
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </nav>
            </div>

            {/* Static Content */}
            <div className="flex-1 p-6">
                <h2 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard!</h2>
                <p className="mb-4">
                    This is the admin dashboard where you can manage courses, create new content,
                    and monitor other activities. Use the sidebar to navigate through different
                    options.
                </p>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Courses</h3>
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
                        <h3 className="text-xl font-bold mb-4">Logout</h3>
                        <p>Click "Logout" to exit the admin dashboard securely.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
