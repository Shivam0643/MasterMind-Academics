import React, { useState, useEffect } from "react";
import { FaHome, FaBook, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineVideoSettings, MdManageHistory } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiMenuAlt4 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Dashboard() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Admin Details on Mount
    useEffect(() => {
        const checkAdminAuth = async () => {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                toast.error("Unauthorized! Please login.");
                navigate("/admin/login");
                return;
            }

            try {
                const res = await axios.get(`${BACKEND_URL}/admin/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAdmin(res.data.admin); // Or setAdmin(res.data) if backend returns differently
                console.log("✅ Admin Data:", res.data.admin);
            } catch (error) {
                console.error("❌ Invalid or expired token.");
                toast.error("Session expired! Please login again.");
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
            } finally {
                setIsLoading(false);
            }
        };

        checkAdminAuth();
    }, [navigate]);

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <p className="text-xl">Loading Dashboard...</p>
            </div>
        );
    }

    if (!admin) return null;

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
                    <Link to="/admin/all-purchases" className="flex items-center space-x-2 p-2 hover:bg-[#24cfa6] rounded hover:text-black font-semibold">
                        <BiSolidUserDetail /> <span>Purchase Details</span>
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
            <div className="flex-1 p-6 sm:mr-64 overflow-y-auto">
                <h2 className="text-3xl font-bold mb-6">Welcome, <span className="text-[#24cfa6]">{admin.firstName} {admin.lastName}!</span></h2>
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
                        <h3 className="text-xl font-bold mb-4">Purchase Details</h3>
                        <p>
                            Use the 'Purchase Details' section to view all the courses user enrolled in. You can track your date of enroll, and can delete the purchase course of particular user.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
