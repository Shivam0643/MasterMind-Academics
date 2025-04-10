import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaArrowDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Purchases = () => {
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPurchasedCourses = async () => {
            try {
                console.log("🔍 Fetching purchased courses...");

                const userData = JSON.parse(localStorage.getItem("user"));
                if (!userData?.token) {
                    console.error("❌ No user token found. User is not authenticated.");
                    setLoading(false); // ✅ Fix: stop loading spinner
                    return;
                }


                const response = await axios.get(`${BACKEND_URL}/course/purchased`, {
                    headers: { Authorization: `Bearer ${userData.token}` },
                });

                console.log("✅ API Response:", response.data);
                setTimeout(() => {
                    setPurchasedCourses(response.data.purchasedCourses || []);
                    setLoading(false);
                }, 1000); // Smooth transition with delay
            } catch (error) {
                console.error("❌ Error fetching purchased courses:", error.response?.data || error.message);
                setLoading(false);
            }
        };

        fetchPurchasedCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        // Redirect to the lectures page for this particular course
        navigate(`/course/${courseId}/lectures`);
    };

    return (
        <div className="bg-[#0c0c0c] min-h-screen">
            <Navbar />
            <div className="container mx-auto py-10 text-white px-4 md:px-20">

                {loading ? (
                    <div className="flex justify-center items-center h-96 w-full">
                        <div className="loader"></div> {/* Loading animation */}
                    </div>
                ) : purchasedCourses.length === 0 ? (
                    <div className="flex justify-center items-center h-96 w-full">
                        <p className="text-gray-300 text-xl">No purchased courses yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col justify-center">
                            <div className="font-mono flex flex-col flex-nowrap  pb-10 md:pb-20 space-y-6 md:space-y-10 transition-all duration-500">
                                <p className="text-4xl md:text-7xl font-mono md:max-w-4xl md:text-start text-center">Not just <span className="text-[#24cfa6]">another course –</span></p>
                                <p className="text-base md:text-2xl font-mono md:text-start text-center">A step toward your success.</p>
                            </div>
                            <p className="text-xl font-mono flex flex-nowrap gap-4 items-center md:justify-start justify-center py-10 w-full transition-all duration-500">
                                Learn what matters <FaArrowDown />
                            </p>
                            <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {purchasedCourses.map((course) => (
                                    <div key={course._id} onClick={() => handleCourseClick(course._id)} className="bg-[#171717] p-4 rounded-2xl shadow-md cursor-pointer">
                                        {course.image?.url ? (
                                            <img
                                                src={course.image.url}
                                                alt={course.title}
                                                className="w-full h-40 md:h-60 object-cover rounded-lg mb-4"
                                            />
                                        ) : (
                                            <div className="h-40 md:h-60 bg-gray-700 flex justify-center items-center rounded-lg w-full">
                                                <p className="text-gray-300">No image available</p>
                                            </div>
                                        )}
                                        <h2 className="text-2xl font-semibold">{course.title}</h2>
                                        <p className="text-gray-400">{course.description}</p>
                                        <p className="text-green-400 font-bold">Price: {course.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="border-t w-full">
                <Footer />
            </div>
        </div>
    );
};

export default Purchases;
