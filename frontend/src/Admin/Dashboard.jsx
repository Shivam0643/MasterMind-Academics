import React from "react";
import { FaHome, FaBook, FaPlusCircle, FaSignOutAlt,FaUserCog } from "react-icons/fa";
import { MdOutlineVideoSettings, MdManageHistory } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get(`${BACKEND_URL}/admin/logout`, {
                withCredentials: true,
            });
            localStorage.removeItem("adminToken");
            toast.success("Logged out successfully");
            navigate("/admin/login");
        } catch (error) {
            toast.error("Failed to logout");
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0c0c0c] text-white">
            {/* Header */}
            <header className="w-full px-6 py-4 bg-[#171717] flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-bold text-[#24cfa6]">Admin <span className="text-white">Dashboard</span></h1>
                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
                    <FaSignOutAlt /> Logout
                </button>
            </header>

            {/* Navigation Grid */}
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                    <Link to="/" className="flex flex-col justify-center items-center text-center gap-2 min-h-[180px] min-w-[180px] px-4 py-4 bg-[#1e1e1e] hover:bg-[#24cfa6] hover:text-black rounded transition font-semibold">
                        <FaHome size={24} />
                        Home
                    </Link>
                    <Link to="/admin/all-users" className="flex flex-col justify-center items-center text-center gap-2 min-h-[180px] min-w-[180px] px-4 py-4 bg-[#1e1e1e] hover:bg-[#24cfa6] hover:text-black rounded transition font-semibold">
                        <FaUserCog size={24} />
                        All Users
                    </Link>
                    <Link to="/admin/ourcourses" className="flex flex-col justify-center items-center text-center gap-2 min-h-[180px] min-w-[180px] px-4 py-4 bg-[#1e1e1e] hover:bg-[#24cfa6] hover:text-black rounded transition font-semibold">
                        <FaBook size={24} />
                        Our Courses
                    </Link>
                    <Link to="/admin/createcourse" className="flex flex-col justify-center items-center text-center gap-2 min-h-[180px] min-w-[180px] px-4 py-4 bg-[#1e1e1e] hover:bg-[#24cfa6] hover:text-black rounded transition font-semibold">
                        <FaPlusCircle size={24} />
                        Create Course
                    </Link>
                    <Link to="/admin/lectures" className="flex flex-col justify-center items-center text-center gap-2 min-h-[180px] min-w-[180px] px-4 py-4 bg-[#1e1e1e] hover:bg-[#24cfa6] hover:text-black rounded transition font-semibold">
                        <MdOutlineVideoSettings size={24} />
                        Manage Lectures
                    </Link>
                    <Link to="/admin/quizzes" className="flex flex-col justify-center items-center text-center gap-2 min-h-[180px] min-w-[180px] px-4 py-4 bg-[#1e1e1e] hover:bg-[#24cfa6] hover:text-black rounded transition font-semibold">
                        <MdManageHistory size={24} />
                        Quiz Management
                    </Link>
                    <Link to="/admin/all-purchases" className="flex flex-col justify-center items-center text-center gap-2 min-h-[180px] min-w-[180px] px-4 py-4 bg-[#1e1e1e] hover:bg-[#24cfa6] hover:text-black rounded transition font-semibold">
                        <BiSolidUserDetail size={24} />
                        Purchase Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
