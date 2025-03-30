import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaArrowDown } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Footer from '../components/Footer';
import { BACKEND_URL } from '../utils/utils';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check user authentication
    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthenticated = !!user?.token;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/course/courses`, {
                    withCredentials: true,
                });

                setCourses(response.data.courses); // Assuming response data has a "courses" key.
            } catch (error) {
                console.log("Error in fetching courses", error);
                toast.error("Failed to fetch courses. Please try again.");
            }
        };

        const fetchPurchasedCourses = async () => {
            if (!isAuthenticated) return;

            try {
                const response = await axios.get(`${BACKEND_URL}/course/purchased`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    withCredentials: true,
                });

                if (response.data.purchasedCourses) {
                    setPurchasedCourses(response.data.purchasedCourses.map(course => course._id));
                }
            } catch (error) {
                console.log("Error in fetching purchased courses", error);
            }
        };

        const fetchData = async () => {
            await fetchCourses();
            if (isAuthenticated) {
                await fetchPurchasedCourses();
            }
            setLoading(false);
        };

        fetchData();
    }, [isAuthenticated, user?.token]);

    const handleViewDetails = (courseId) => {
        if (isAuthenticated) {
            navigate(`/courses/${courseId}`);
        } else {
            toast.error("Please login to view course details.");
        }
    };

    // Filter out purchased courses
    const filteredCourses = courses.filter(course => !purchasedCourses.includes(course._id));

    return (
        <div className="bg-[#0c0c0c] h-screen">
            <div className="flex flex-col w-full bg-[#0c0c0c] h-auto transition-all duration-200">
                <div className="top-0 w-full fixed backdrop-blur-sm">
                    <Navbar />
                </div>

                <div className="py-10 px-4 md:px-20 flex flex-col text-white transition-all duration-500">
                    {loading ? (
                        <div className="flex justify-center items-center h-96 w-full">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <>
                            {filteredCourses.length === 0 ? (
                                <div className="text-center py-10 h-screen flex items-center justify-center">
                                    <div className='flex flex-col flex-nowrap justify-center items-center'>
                                        <p className="text-3xl font-mono ">
                                            Thank you for purchasing all courses! 🎉
                                        </p>
                                        <p className="text-xl text-gray-400 mt-4">
                                            You have access to all our premium content. Enjoy learning!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col flex-nowrap pt-32 pb-10 md:pt-20 md:pb-20 space-y-6 md:space-y-10 transition-all duration-500">
                                        <p className="text-4xl md:text-7xl font-mono md:max-w-4xl md:text-start text-center">
                                            We're not a <span className="text-[#24cfa6]">course factory.</span>
                                        </p>
                                        <p className="text-base md:text-2xl font-mono md:text-start text-center">
                                            We focus on courses that really help.
                                        </p>
                                    </div>
                                    <p className="text-xl font-mono flex flex-nowrap gap-4 items-center md:justify-start justify-center py-10 w-full transition-all duration-500">
                                        Courses which do work <FaArrowDown />
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-10 md:gap-20">
                                        {filteredCourses.map((course) => (
                                            <div key={course._id} className="flex flex-col gap-4">
                                                <div onClick={() => handleViewDetails(course._id)} className="bg-[#171717] text-white flex flex-col flex-nowrap h-96 rounded-2xl cursor-pointer ">
                                                    <img
                                                        src={course.image.url}
                                                        alt={course.title}
                                                        className="w-full h-64 object-cover rounded-t-2xl shadow-md"
                                                    />
                                                    <div className="flex flex-col justify-center px-6 py-4">
                                                        <span className="text-lg font-semibold">{course.title}</span>
                                                        <span className="text-sm text-gray-400">{course.description}</span>
                                                        <span className="text-lg font-bold mt-2">₹ {course.price}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleViewDetails(course._id)}
                                                    className="bg-[#24cfa6] rounded-md text-black py-2 font-semibold text-lg text-center"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            {/* footer */}
            <div className='border-t w-full '>
                <Footer />
            </div>
        </div>
    );
}

export default Courses;
