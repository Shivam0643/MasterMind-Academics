import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

function CourseLectures() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
    const [hasPurchased, setHasPurchased] = useState(false);
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            const fetchLectures = async () => {
                try {
                    const user = JSON.parse(localStorage.getItem("user"));
                    const response = await axios.get(`${BACKEND_URL}/user/purchases/${user._id}`);
                    const purchasedCourses = response.data.purchasedCourses || [];

                    if (!purchasedCourses.includes(courseId)) {
                        navigate(`/courses/${courseId}`);
                    } else {
                        setHasPurchased(true);
                        const lecturesRes = await axios.get(`${BACKEND_URL}/course/${courseId}/lectures`);
                        setLectures(lecturesRes.data.lectures);
                    }
                } catch (error) {
                    console.error("Error fetching lectures:", error);
                    navigate("/courses");
                }
            };

            fetchLectures();
        }
    }, [courseId, isLoggedIn, navigate]);

    return hasPurchased ? (
        <div className="text-white p-10">
            <h1 className="text-3xl font-bold">Course Lectures</h1>
            <ul>
                {lectures.map((lecture, index) => (
                    <li key={index} className="my-4">{lecture.title}</li>
                ))}
            </ul>
        </div>
    ) : null;
}

export default CourseLectures;
