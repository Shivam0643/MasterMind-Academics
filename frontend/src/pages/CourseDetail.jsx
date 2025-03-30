import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import { jwtDecode } from "jwt-decode";

function CourseDetail() {
    const { courseId } = useParams();
    const navigate = useNavigate(); // ✅ Navigate hook

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPurchased, setIsPurchased] = useState(false);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/course/courses/${courseId}`);
                setTimeout(() => {
                    setCourse(response.data.course);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching course details:", error);
                setLoading(false);
            }
        };

        const checkPurchasedCourses = async () => {
            const userData = JSON.parse(localStorage.getItem("user"));

            if (!userData?.token) {
                console.error("User not logged in");
                return;
            }

            try {
                const res = await axios.get(`${BACKEND_URL}/course/purchased`, {
                    headers: { Authorization: `Bearer ${userData.token}` }
                });

                const purchasedCourses = res.data.purchasedCourses;

                // ✅ Check if this course is already purchased
                if (purchasedCourses.some(course => course._id === courseId)) {
                    setIsPurchased(true);
                    navigate("/purchase"); // ✅ Redirect if purchased
                }
            } catch (error) {
                console.error("Error checking purchased courses:", error);
            }
        };

        fetchCourseDetail();
        checkPurchasedCourses(); // ✅ Check purchase status

    }, [courseId, navigate]);

    const handleBuyNow = async () => {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (!userData?.token) {
            toast.error("Please login again");
            navigate("/login");
            return;
        }

        const decodedToken = jwtDecode(userData.token);
        const userId = decodedToken.id;

        if (!userId) {
            toast.error("Authentication error, please login again");
            navigate("/login");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/course/purchase`, {
                userId,
                courseId
            }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            });

            toast.success("Purchase successful!");
            navigate("/purchase"); // ✅ Redirect to purchases after buying

        } catch (err) {
            console.error("Purchase error:", err);
            toast.error(err.response?.data?.message || "Course already purchased");
        }
    };

    return (
        <div className="bg-[#0c0c0c] min-h-screen">
            <div className="fixed top-0 w-full backdrop-blur-sm z-10">
                <Navbar />
            </div>

            <div className="md:py-10 md:px-20 flex flex-col w-full text-white transition-all duration-500">
                {loading ? (
                    <div className="flex justify-center items-center h-96 w-full">
                        <div className="loader"></div>
                    </div>
                ) : course ? (
                    <div className="py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Course Content */}
                        <div className="space-y-2 md:space-y-10 flex flex-col justify-center order-2 md:order-1">
                            <h1 className="text-5xl md:text-7xl font-bold">{course.title}</h1>
                            <p className="text-2xl md:text-4xl font-semibold">{course.description}</p>
                            <p className="text-3xl md:text-4xl font-bold md:pb-0 pb-4">
                                Price: <span className="text-[#02e797]">{course.price}</span>
                            </p>

                            {/* ✅ Show "Already Purchased" if course is owned */}
                            {isPurchased ? (
                                <p className="text-xl text-green-400 font-semibold">Already Purchased</p>
                            ) : (
                                <button
                                    onClick={handleBuyNow}
                                    className="bg-[#009560] rounded-lg w-56 md:w-64 text-white py-2 px-4 md:py-3 md:px-5 font-bold text-base md:text-lg text-center"
                                >
                                    Buy Now - Start Learning
                                </button>
                            )}
                        </div>

                        <div className="order-1 md:order-2">
                            {/* Course Image */}
                            {course.image?.url ? (
                                <img
                                    src={course.image.url}
                                    alt={course.title}
                                    className="w-full h-60 md:h-96 object-cover rounded-xl border-white border bg-black"
                                />
                            ) : (
                                <div className="h-60 md:h-96 bg-gray-700 flex justify-center items-center rounded-lg w-full">
                                    <p className="text-gray-300">No image available</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <p className="text-white">Course not found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseDetail;
