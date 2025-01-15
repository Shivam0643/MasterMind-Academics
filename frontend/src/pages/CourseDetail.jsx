import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // For accessing the dynamic courseId
import axios from 'axios';
import { Link } from 'react-router-dom';

function CourseDetail() {
    const { courseId } = useParams(); // Get the dynamic course ID from the URL
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                // Fetching the course detail using the dynamic courseId
                const response = await axios.get(`http://localhost:3000/api/v1/course/courses/${courseId}`);
                setCourse(response.data.course); // Set course data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetail(); // Fetch the course detail when component mounts
    }, [courseId]); // Dependency on courseId to refetch data when it changes

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                Loading...
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                Course not found.
            </div>
        );
    }

    return (
        <div className="text-black p-10">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <img src={course.image.url} alt={course.title} className="w-full h-96 object-cover mb-4 rounded-lg" />
            <p className="text-lg mb-4">{course.description}</p>
            <p className="text-xl font-semibold mb-4">Price: {course.price}</p>
            <Link
                to={`/courses/buy/${courseId}`}
                className="bg-[#24cfa6] rounded-2xl text-black py-2 font-semibold text-lg text-center"
            >
                Buy Now
            </Link>
        </div >
    );
}

export default CourseDetail;
