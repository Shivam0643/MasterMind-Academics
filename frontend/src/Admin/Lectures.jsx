import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Import useParams
import { BACKEND_URL } from "../utils/utils";

function Lectures() {
    const { courseId } = useParams(); // ✅ Extract courseId from URL
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(courseId || ""); // ✅ Use URL param if available
    const [lectures, setLectures] = useState([]);
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");

    useEffect(() => {
        // console.log("🔥 useEffect triggered with courseId:", courseId);
        fetchCourses(); // ✅ Fetch courses when the component loads

        if (!courseId) {
            console.warn("⚠ No courseId provided in URL.");
            return;
        }

        fetchLectures(courseId);
    }, [courseId]); // ✅ Dependencies: courseId changes trigger lecture fetch


    const fetchCourses = async () => {
        const adminData = JSON.parse(localStorage.getItem("admin") || "{}");
        const token = adminData?.token;

        if (!token) {
            toast.error("Authentication required! Please log in again.");
            navigate("/admin/login");
            return;
        }

        try {
            // console.log("Fetching courses...");
            const response = await axios.get(`${BACKEND_URL}/course/courses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data.courses) {
                setCourses(response.data.courses);
            } else {
                setCourses([]);
            }
        } catch (error) {
            console.error("❌ Error Fetching Courses:", error.response);
            toast.error(error.response?.data?.message || "Failed to fetch courses.");
        }
    };

    const fetchLectures = async (courseId) => {
        if (!courseId) {
            console.warn("⚠ No courseId provided to fetch lectures.");
            return;
        }

        // console.log(`📚 Fetching lectures for courseId: ${courseId}`); // Debugging log

        const adminData = JSON.parse(localStorage.getItem("admin") || "{}");
        const token = adminData?.token;

        if (!token) {
            toast.error("Authentication required! Please log in again.");
            navigate("/admin/login");
            return;
        }

        try {
            const response = await axios.get(`${BACKEND_URL}/lectures/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // console.log("✅ API Response:", response.data); // Log API response

            if (response.data.lectures) {
                setLectures(response.data.lectures);
            } else {
                setLectures([]);
            }
        } catch (error) {
            console.error("❌ Error Fetching Lectures:", error.response?.data);
            toast.error(error.response?.data?.message || "Failed to fetch lectures.");
        }
    };

    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        setSelectedCourse(courseId);
        if (courseId) {
            fetchLectures(courseId);
        }
    };

    const handleAddLecture = async (e) => {
        e.preventDefault();

        if (!selectedCourse || !title || !video) {
            toast.error("All fields are required!");
            return;
        }

        const lectureData = { title, videoUrl: video };
        const adminData = JSON.parse(localStorage.getItem("admin") || "{}");
        const token = adminData?.token;

        if (!token) {
            toast.error("Authentication required! Please log in again.");
            return;
        }

        try {
            await axios.post(
                `${BACKEND_URL}/lectures/${selectedCourse}/add`,
                lectureData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            toast.success("Lecture added successfully!");
            fetchLectures(selectedCourse);
            setTitle("");
            setVideo("");
        } catch (error) {
            console.error("❌ Error Adding Lecture:", error.response?.data);

            if (error.response?.status === 401) {
                toast.error("Session expired! Please log in again.");
                localStorage.removeItem("admin");
                window.location.href = "/admin/login";
            } else {
                toast.error(error.response?.data?.message || "Failed to add lecture.");
            }
        }
    };

    const handleDeleteLecture = async (lectureId) => {
        if (!window.confirm("Are you sure you want to delete this lecture?")) {
            return;
        }

        const adminData = JSON.parse(localStorage.getItem("admin") || "{}");
        const token = adminData?.token;

        if (!token) {
            toast.error("Authentication required! Please log in again.");
            navigate("/admin/login");
            return;
        }

        try {
            await axios.delete(`${BACKEND_URL}/lectures/${selectedCourse}/delete/${lectureId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Lecture deleted successfully!");
            setLectures((prevLectures) => prevLectures.filter((lecture) => lecture._id !== lectureId));
        } catch (error) {
            // console.error("❌ Error Deleting Lecture:", error.response?.data);
            toast.error(error.response?.data?.message || "Failed to delete lecture.");
        }
    };

    return (
        <div className="p-6 bg-[#0c0c0c] min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6">Manage Lectures</h2>

            <label className="block mb-2">Select Course:</label>
            <select onChange={handleCourseChange} value={selectedCourse} className="p-2 border border-[#24cfa6] bg-[#171717]">
                <option value="" >Select a Course</option>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <option key={course._id} value={course._id} >
                            {course.title}
                        </option>
                    ))
                ) : (
                    <option disabled>No Courses Available</option>
                )}
            </select>
            <div className="border border-[#24cfa6] my-3 py-4 px-4">
                <h3 className="text-xl font-bold">All Lectures</h3>
                <div className="h-[250px] overflow-auto">
                    {lectures.length === 0 && <p className="text-red-500">⚠ No lectures found!</p>}
                    <ul className="mt-2">
                        {lectures.map((lecture) => (
                            <li key={lecture._id} className="flex justify-between p-2 border-b">
                                <span>{lecture.title}</span>
                                <button
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                    onClick={() => handleDeleteLecture(lecture._id)} // ✅ Delete Function
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <h3 className="text-xl font-bold mt-6">Add New Lecture</h3>
            <form onSubmit={handleAddLecture} className="mt-2 space-y-4">
                <input
                    type="text"
                    placeholder="Lecture Title"
                    className="p-2 border border-[#24cfa6] w-full bg-[#171717]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Video URL"
                    className="p-2 border border-[#24cfa6] w-full bg-[#171717] "
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                />
                <button type="submit" className="bg-[#24cfa6] hover:bg-[#1f9e83] text-black font-semibold px-6 py-3 rounded transition-all">
                    Add Lecture
                </button>
            </form>
        </div>
    );
}

export default Lectures;
