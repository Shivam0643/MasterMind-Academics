import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/course/courses", {
                    withCredentials: true,
                });
                console.log(response.data.courses);
                setCourses(response.data.courses);  // Assuming response data has a "courses" key.
            } catch (error) {
                console.log("Error in fetching courses", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className='py-10 px-10 flex flex-col text-white '>
            <h1 className='pb-10 text-4xl font-bold font-mono'>Courses Offered.</h1>
            {courses.map((course) => (
                <div key={course.id} className='grid grid-cols-3 gap-20'>
                    <div className="flex flex-col w-80  gap-4">
                        <div className='bg-[#171717] text-white flex flex-col flex-nowrap h-96 rounded-2xl'>
                            <img src={course.image.url} alt={course.title} />
                            <div className='flex flex-col justify-center px-10 py-10'>
                                <span>{course.title}</span>
                                <span>{course.description}</span>
                                <span>{course.price}</span>
                            </div>
                        </div>
                        <Link to={'/'} className="bg-[#24cfa6] rounded-2xl text-black py-2 font-semibold text-lg text-center" >View Details</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Courses;
