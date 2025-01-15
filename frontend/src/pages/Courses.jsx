import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaArrowDown } from "react-icons/fa6";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/course/courses", {
                    withCredentials: true,
                });
                // Simulate a delay of 3 seconds (3000ms) before updating the state
                setTimeout(() => {
                    console.log(response.data.courses);
                    setCourses(response.data.courses); // Assuming response data has a "courses" key.
                    setLoading(false);
                }, 2000); // 3-second delay
            } catch (error) {
                console.log("Error in fetching courses", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className='bg-[#0c0c0c] h-screen'>


            <div className='flex flex-col w-full bg-[#0c0c0c] h-auto transition-all duration-200'>
                <div className='top-0 w-full fixed backdrop-blur-sm'>
                    <Navbar />
                </div>

                <div className='py-10 px-4 md:px-20 flex flex-col text-white transition-all duration-500'>

                    {loading ? (
                        <div className=' flex justify-center items-center h-96 w-full'>
                            <div className='loader'></div>
                        </div>
                    ) : (
                        <>
                            <div className='flex flex-col flex-nowrap pt-32 pb-10 md:pt-20 md:pb-20 space-y-6 md:space-y-10 transition-all duration-500'>
                                <p className=' text-4xl md:text-7xl font-mono  md:max-w-4xl md:text-start text-center'>We're not a <span className='text-[#24cfa6]'>course factory.</span></p>
                                <p className='text-base md:text-2xl font-mono md:text-start text-center'>We focus on courses that really help.</p>
                            </div>
                            <p className='text-xl font-mono flex flex-nowrap gap-4 items-center md:justify-start justify-center py-10 w-full transition-all duration-500'>Courses which do work <FaArrowDown /></p>
                            {courses.map((course) => (
                                <div key={course._id} className='grid md:grid-cols-3 gap-10 md:gap-20 justify-center items-center transition-all duration-500'>
                                    <div className="flex flex-col w-80 md:w-[500px] gap-4">
                                        <div className='bg-[#171717] text-white flex flex-col flex-nowrap h-96 rounded-2xl'>
                                            <img src={course.image.url} alt={course.title} />
                                            <div className='flex flex-col justify-center px-10 py-10'>
                                                <span>{course.title}</span>
                                                <span>{course.description}</span>
                                                <span>{course.price}</span>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/courses/${course._id}`}
                                            className="bg-[#24cfa6] rounded-2xl text-black py-2 font-semibold text-lg text-center"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}


                </div>
            </div>
        </div>
    );
}

export default Courses;
