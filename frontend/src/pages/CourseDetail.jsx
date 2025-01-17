import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast

function CourseDetail() {
    const { courseId } = useParams(); // Get the dynamic course ID from the URL
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true); // Default state is true to show the loading spinner

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                // Simulate a delay (like in Courses component)
                const response = await axios.get(`http://localhost:3000/api/v1/course/courses/${courseId}`);
                setTimeout(() => {
                    setCourse(response.data.course); // Set course data
                    setLoading(false); // End loading state
                }, 2000); // 2-second delay for consistency
            } catch (error) {
                console.error("Error fetching course details:", error);
                setLoading(false); // Ensure loading ends even on error
            }
        };

        fetchCourseDetail(); // Fetch course details when component mounts
    }, [courseId]); // Dependency on courseId

    const handleBuyNow = () => {
        toast.success("Purchase successful! Start learning now.", {
            position: "top-center",
        });
    };

    return (
        <div className="bg-[#0c0c0c] min-h-screen">
            <div className="fixed top-0 w-full backdrop-blur-sm z-10">
                <Navbar />
            </div>

            <div className="md:py-10 md:px-20 flex flex-col w-full text-white transition-all duration-500">
                {loading ? (
                    <div className="flex justify-center items-center h-96 w-full">
                        <div className="loader"></div> {/* Loading spinner */}
                    </div>
                ) : course ? (
                    <div className="py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 ">
                        {/* Course Content */}
                        <div className="space-y-2 md:space-y-10 flex flex-col justify-center order-2 md:order-1">
                            <h1 className="text-5xl md:text-7xl font-bold">{course.title}</h1>
                            <p className="text-2xl md:text-4xl font-semibold">{course.description}</p>
                            <p className="text-3xl md:text-4xl font-bold md:pb-0 pb-4">
                                Price: <span className="text-[#02e797]">{course.price}</span>
                            </p>
                            <button
                                onClick={handleBuyNow}
                                className="bg-[#009560] rounded-lg w-56 md:w-64 text-white py-2 px-4 md:py-3 md:px-5 font-bold text-base md:text-lg text-center "
                            >
                                Buy Now - Start Learning
                            </button>
                        </div>

                        <div className=' order-1 md:order-2'>

                            {/* Course Image */}
                            {course.image?.url ? (
                                <img
                                    src={course.image.url}
                                    alt={course.title}
                                    className="w-full h-60  md:h-96 object-cover rounded-xl border-white border bg-black"
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
