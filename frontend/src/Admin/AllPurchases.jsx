import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import toast from "react-hot-toast";

const AllPurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPurchases = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.get(`${BACKEND_URL}/course/all-purchases`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setTimeout(() => {
                setPurchases(response.data.purchases);
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.error("❌ Failed to fetch purchase data:", error);
            toast.error("Failed to fetch purchase details.");
        }
    };

    const handleDelete = async (purchaseId) => {
        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`${BACKEND_URL}/course/delete-purchase/${purchaseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            toast.success("Purchase deleted successfully");
            fetchPurchases();
        } catch (error) {
            console.error("❌ Failed to delete purchase:", error);
            toast.error("Failed to delete purchase");
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    return (
        <div className="p-6 bg-[#0c0c0c] text-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">All Course Purchases</h2>

            {loading ? (
                <div className="flex justify-center items-center h-[50vh]">
                    <div className="loader"></div>
                </div>
            ) : purchases.length === 0 ? (
                <p className="text-white text-center text-lg">No purchases found.</p>
            ) : (
                <div className="w-full border border-[#24cfa6] max-h-[80vh] overflow-y-auto">
                    <div className="hidden md:table w-full">
                        <div className="table-header-group border border-[#24cfa6] ">
                            <div className="table-row ">
                                <div className="table-cell px-4 py-3 font-semibold text-left text-white border-b border-[#24cfa6]">Username</div>
                                <div className="table-cell px-4 py-3 font-semibold text-left text-white border-b border-[#24cfa6]">Email</div>
                                <div className="table-cell px-4 py-3 font-semibold text-left text-white border-b border-[#24cfa6]">Course</div>
                                <div className="table-cell px-4 py-3 font-semibold text-left text-white border-b border-[#24cfa6]">Price</div>
                                <div className="table-cell px-4 py-3 font-semibold text-left text-white border-b border-[#24cfa6]">Date</div>
                                <div className="table-cell px-4 py-3 font-semibold text-left text-white border-b border-[#24cfa6]">Action</div>
                            </div>
                        </div>
                        <div className="table-row-group bg-black divide-y divide-[#24cfa6] ">
                            {purchases.map((purchase) => (
                                <div className="table-row " key={purchase._id}>
                                    <div className="table-cell px-4 py-3 text-white border-b border-[#24cfa6]">
                                        {purchase.userId?.firstName} {purchase.userId?.lastName}
                                    </div>
                                    <div className="table-cell px-4 py-3 text-white border-b border-[#24cfa6]">
                                        {purchase.userId?.email}
                                    </div>
                                    <div className="table-cell px-4 py-3 text-white border-b border-[#24cfa6]">
                                        {purchase.courseId?.title}
                                    </div>
                                    <div className="table-cell px-4 py-3 text-white border-b border-[#24cfa6]">
                                        ₹{purchase.courseId?.price}
                                    </div>
                                    <div className="table-cell px-4 py-3 text-white border-b border-[#24cfa6]">
                                        {new Date(purchase.purchasedAt).toLocaleDateString()}
                                    </div>
                                    <div className="table-cell px-4 py-3 border-b border-[#24cfa6]">
                                        <button
                                            onClick={() => handleDelete(purchase._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden flex flex-col divide-y divide-[#24cfa6]">
                        {purchases.map((purchase) => (
                            <div key={purchase._id} className="p-4 bg-black flex flex-col gap-2">
                                <div>
                                    <span className="font-semibold text-white">Username: </span>
                                    {purchase.userId?.firstName} {purchase.userId?.lastName}
                                </div>
                                <div className="text-gray-300">
                                    <span className="font-semibold text-white">Email: </span>
                                    {purchase.userId?.email}
                                </div>
                                <div>
                                    <span className="font-semibold text-white">Course: </span>
                                    {purchase.courseId?.title}
                                </div>
                                <div className="text-gray-300">
                                    <span className="font-semibold text-white">Price: </span>
                                    ₹{purchase.courseId?.price}
                                </div>
                                <div className="text-gray-300">
                                    <span className="font-semibold text-white">Date: </span>
                                    {new Date(purchase.purchasedAt).toLocaleDateString()}
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleDelete(purchase._id)}
                                        className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPurchases;
