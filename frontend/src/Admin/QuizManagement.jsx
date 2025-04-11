import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function QuizManagement() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [quizTitle, setQuizTitle] = useState("");
    const [quizUrl, setQuizUrl] = useState("");
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            fetchQuiz(selectedCourse);
        } else {
            setQuiz(null);
        }
    }, [selectedCourse]);

    const getToken = () => localStorage.getItem("adminToken");

    const fetchCourses = async () => {
        const token = getToken();

        if (!token) {
            toast.error("Authentication required! Please log in again.");
            navigate("/admin/login");
            return;
        }

        try {
            const response = await axios.get(`${BACKEND_URL}/course/courses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(response.data.courses || []);
        } catch (error) {
            toast.error("Failed to fetch courses.");
        }
    };

    const fetchQuiz = async (courseId) => {
        const token = getToken();

        if (!token) {
            toast.error("Authentication required! Please log in again.");
            navigate("/admin/login");
            return;
        }

        try {
            const response = await axios.get(`${BACKEND_URL}/quiz/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuiz(response.data.quiz || null);
        } catch (error) {
            setQuiz(null);
            toast.error(error.response?.data?.message || "Failed to fetch quiz.");
        }
    };

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const handleAddQuiz = async (e) => {
        e.preventDefault();
        const token = getToken();

        if (!token) {
            toast.error("Authentication required! Please log in again.");
            navigate("/admin/login");
            return;
        }

        if (!selectedCourse || !quizTitle || !quizUrl) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/quiz/${selectedCourse}/add`, {
                title: quizTitle,
                quizUrl: quizUrl,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            toast.success("Quiz added successfully!");
            setQuiz(response.data.quiz);
            setQuizTitle("");
            setQuizUrl("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add quiz.");
        }
    };

    const handleDeleteQuiz = async () => {
        if (!window.confirm("Are you sure you want to delete this quiz?")) return;
        const token = getToken();

        if (!token) {
            toast.error("Authentication required! Please log in again.");
            navigate("/admin/login");
            return;
        }

        try {
            await axios.delete(`${BACKEND_URL}/quiz/${selectedCourse}/delete`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            toast.success("Quiz deleted successfully!");
            setQuiz(null);
        } catch (error) {
            toast.error("Failed to delete quiz.");
        }
    };

    return (
        <div className="p-6 bg-[#0c0c0c] min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6">Manage Quizzes</h2>

            <label className="block mb-2">Select Course:</label>
            <select onChange={handleCourseChange} value={selectedCourse} className="p-2 border border-[#24cfa6] bg-[#171717]">
                <option value="">Select a Course</option>
                {courses.map((course) => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                ))}
            </select>

            {selectedCourse && (
                <div className="border border-[#24cfa6] my-3 py-4 px-4">
                    <h3 className="text-xl font-bold">Quiz</h3>
                    {quiz ? (
                        <div className="flex justify-between p-2 border-b">
                            <a href={quiz.quizUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400">{quiz.title}</a>
                            <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={handleDeleteQuiz}>Delete</button>
                        </div>
                    ) : (
                        <p className="text-red-500">⚠ No quiz found for this course!</p>
                    )}
                </div>
            )}

            {selectedCourse && !quiz && (
                <div>
                    <h3 className="text-xl font-bold mt-6">Add New Quiz</h3>
                    <form onSubmit={handleAddQuiz} className="mt-2 space-y-4">
                        <input
                            type="text"
                            placeholder="Quiz Title"
                            className="p-2 border border-[#24cfa6] w-full bg-[#171717]"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Quiz URL"
                            className="p-2 border border-[#24cfa6] w-full bg-[#171717]"
                            value={quizUrl}
                            onChange={(e) => setQuizUrl(e.target.value)}
                        />
                        <button type="submit" className="bg-[#24cfa6] hover:bg-[#1f9e83] text-black font-semibold px-6 py-3 rounded transition-all">
                            Add Quiz
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default QuizManagement;
