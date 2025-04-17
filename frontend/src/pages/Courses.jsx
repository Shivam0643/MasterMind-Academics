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

    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthenticated = !!user?.token;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/course/courses`);
                setCourses(response.data.courses || []);
            } catch (error) {
                toast.error("Failed to fetch courses. Please try again.");
            }
        };

        const fetchPurchasedCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/course/purchased`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                // Make sure we're storing just the course IDs
                if (response.data.purchasedCourses) {
                    const ids = response.data.purchasedCourses.map(course => course._id);
                    setPurchasedCourses(ids);
                }
            } catch (error) {
                console.error("Error fetching purchased courses", error);
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

    // Filter out already purchased courses
    const availableCourses = courses.filter(course => !purchasedCourses.includes(course._id));

    return (
        <div className="bg-[#0c0c0c] min-h-screen">
            <div className="flex flex-col w-full bg-[#0c0c0c] h-auto transition-all duration-200">
                <div className="top-0 w-full fixed backdrop-blur-sm z-50">
                    <Navbar />
                </div>

                <div className="py-10 px-4 md:px-20 flex flex-col text-white transition-all duration-500">
                    {loading ? (
                        <div className="flex justify-center items-center h-96 w-full">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <>
                            {availableCourses.length === 0 ? (
                                <div className="text-center py-10 h-screen flex items-center justify-center">
                                    <div className='flex flex-col items-center'>
                                        <p className="text-3xl font-mono text-[#24cfa6]">
                                            🎉 You’ve purchased all available courses!
                                        </p>
                                        <p className="text-xl text-gray-400 mt-4">
                                            Head over to your dashboard and start learning.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col pt-32 pb-10 md:pt-20 md:pb-20 space-y-6 md:space-y-10">
                                        <p className="text-4xl md:text-7xl font-mono md:max-w-4xl text-center md:text-left">
                                            We're not a <span className="text-[#24cfa6]">course factory.</span>
                                        </p>
                                        <p className="text-base md:text-2xl font-mono text-center md:text-left">
                                            We focus on courses that really help.
                                        </p>
                                    </div>
                                    <p className="text-xl font-mono flex items-center justify-center md:justify-start gap-4 py-10">
                                        Courses that actually help <FaArrowDown />
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
                                        {availableCourses.map((course) => (
                                            <div key={course._id} className="flex flex-col gap-4">
                                                <div onClick={() => handleViewDetails(course._id)} className="bg-[#171717] text-white rounded-2xl h-96 cursor-pointer hover:shadow-lg transition-all">
                                                    <img
                                                        src={course.image.url}
                                                        alt={course.title}
                                                        className="w-full h-64 object-cover rounded-t-2xl"
                                                    />
                                                    <div className="px-6 py-4">
                                                        <h2 className="text-lg font-semibold">{course.title}</h2>
                                                        <p className="text-sm text-gray-400 truncate">{course.description}</p>
                                                        <p className="text-lg font-bold mt-2">₹ {course.price}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleViewDetails(course._id)}
                                                    className="bg-[#24cfa6] rounded-md text-black py-2 font-semibold text-lg"
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

            <div className='border-t w-full'>
                <Footer />
            </div>
        </div>
    );
}

export default Courses;
