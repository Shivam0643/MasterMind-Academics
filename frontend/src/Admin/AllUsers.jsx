import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import { toast } from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get(`${BACKEND_URL}/user/all-users`, {
                withCredentials: true,
            });
            
            const sortedUsers = data.users.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            setUsers(sortedUsers);
        } catch (error) {
            toast.error("Failed to fetch users");
            console.error(error);
        }
    };

    const handleDelete = async (userId) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (isConfirmed) {
            try {
                await axios.delete(`${BACKEND_URL}/user/delete-user/${userId}`, {
                    withCredentials: true,
                });
                toast.success("User deleted");
                setUsers(users.filter((user) => user._id !== userId));
            } catch (error) {
                toast.error("Failed to delete user");
                console.error(error);
            }
        }
    };

    const handleToggleBlock = async (userId, isBlocked) => {
        try {
            await axios.patch(
                `${BACKEND_URL}/user/toggle-block/${userId}`,
                {},
                { withCredentials: true }
            );
            toast.success(`User ${isBlocked ? "unblocked" : "blocked"}`);
            setUsers((prev) =>
                prev.map((user) =>
                    user._id === userId ? { ...user, isBlocked: !isBlocked } : user
                )
            );
        } catch (error) {
            toast.error("Failed to update block status");
            console.error(error);
        }
    };

    const filteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0c0c0c] text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-[#24cfa6] border-b pb-2">
                Registered Users
            </h1>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="p-3 rounded-lg bg-[#1f1f1f] text-white focus:outline-none focus:ring-2 focus:ring-[#24cfa6] placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-400">No users found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-all duration-300 p-4">
                    {filteredUsers.map((user, index) => (
                        <div
                            key={user._id}
                            className="bg-[#1f1f1f] rounded-xl p-5 transition-all duration-300 relative"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <FaUserCircle className="text-4xl text-[#24cfa6]" />
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {user.firstName} {user.lastName}
                                    </h2>
                                    <p className="text-sm text-gray-400">#{index + 1}</p>
                                </div>
                            </div>
                            <div className="text-sm space-y-1 mb-4">
                                <p>
                                    <span className="text-[#24cfa6] font-medium">Email:</span>{" "}
                                    {user.email}
                                </p>
                                <p>
                                    <span className="text-[#24cfa6] font-medium">Joined:</span>{" "}
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="text-[#24cfa6] font-medium">Purchased Courses:</span>{" "}
                                    {user.purchasedCourses?.length || 0}
                                </p>
                                <p>
                                    <span className="text-[#24cfa6] font-medium">Status:</span>{" "}
                                    {user.isBlocked ? "Blocked" : "Active"}
                                </p>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                                    className={`${user.isBlocked ? "bg-green-500" : "bg-gray-500"
                                        } text-white px-3 py-1 rounded hover:opacity-80 transition`}
                                >
                                    {user.isBlocked ? "Unblock" : "Block"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllUsers;
