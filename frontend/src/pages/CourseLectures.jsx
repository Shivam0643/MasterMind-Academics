import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaVideo } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

function CourseLectures() {
    const { courseId } = useParams();
    const [lectures, setLectures] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [quizUrl, setQuizUrl] = useState(null); // Store quiz URL
    const [loading, setLoading] = useState(true);

    // Extract YouTube video ID
    const getYouTubeVideoId = (url) => {
        const regExp =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.*\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s]*)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const courseResponse = await axios.get(`${BACKEND_URL}/course/${courseId}`, {
                    withCredentials: true,
                });
                setCourseName(courseResponse.data.title);
            } catch (error) {
                console.error("Error fetching course details", error);
            }
        };

        const fetchLectures = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/lectures/${courseId}`, {
                    withCredentials: true,
                });
                setLectures(response.data.lectures);
            } catch (error) {
                console.error("Error fetching lectures", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchQuiz = async () => {
            const token = localStorage.getItem("token");
            console.log("Token before request:", token); // Debugging token

            try {
                const response = await axios.get(`${BACKEND_URL}/quiz/${courseId}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Quiz fetched successfully:", response.data);

                // Ensure correct response handling
                if (response.data.quiz && response.data.quiz.quizUrl) {
                    setQuizUrl(response.data.quiz.quizUrl); // Update the quiz URL state
                    console.log("Quiz URL after setting state:", response.data.quiz.quizUrl);
                } else {
                    console.warn("Quiz URL not found in response");
                    setQuizUrl(null);
                }
            } catch (error) {
                console.error("Error fetching quiz:", error.response?.data || error);
                toast.error("Failed to fetch quiz. Please try again.");
            }
        };

        fetchCourseDetails();
        fetchLectures();
        fetchQuiz();
    }, [courseId]);

    // Log quizUrl state updates
    useEffect(() => {
        console.log("Updated quizUrl state:", quizUrl);
    }, [quizUrl]);

    const handleLectureClick = (videoUrl) => {
        window.open(videoUrl, "_blank");
    };

    const handleQuizClick = () => {
        console.log("handleQuizClick triggered. Current quizUrl:", quizUrl);

        if (quizUrl) {
            window.open(quizUrl, "_blank");
        } else {
            console.warn("Quiz URL is null! Showing toast error.");
            toast.error("No quiz found for this course!");
        }
    };

    return (
        <div className="bg-[#0c0c0c] min-h-screen">
            <Navbar />
            <div className="container mx-auto py-10 text-white px-4 md:px-20">
                {loading ? (
                    <div className="flex justify-center items-center h-96 w-full">
                        <div className="loader"></div> {/* Loading animation */}
                    </div>
                ) : lectures.length === 0 ? (
                    <div className="flex justify-center items-center h-96 w-full">
                        <p className="text-gray-300 text-xl">No lectures available for this course.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className="font-mono flex flex-col flex-nowrap pb-10 md:pb-20 space-y-6 md:space-y-10 transition-all duration-500">
                                    <p className=" text-3xl md:text-4xl font-mono  md:text-start text-center">
                                        Lectures for <br /> <span className="text-[#24cfa6] text-4xl md:text-7xl">{courseName || "Loading..."}</span>
                                    </p>
                                    <p className="text-base md:text-2xl font-mono md:text-start text-center flex items-center gap-2">
                                        Learn and grow with these lectures <FaArrowDown />
                                    </p>
                                </div>
                                {/* Quiz Button */}
                                <div className="flex justify-end  md:mt-44 sticky w-full md:w-auto">
                                    <button
                                        className="bg-[#24cfa6] font-semibold text-black py-2 px-6 rounded-lg flex flex-nowrap justify-center items-center"
                                        onClick={handleQuizClick}
                                    >
                                        <FaQuestionCircle className="mr-2" />
                                        Take Quiz
                                    </button>
                                </div>
                            </div>
                            <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {lectures.map((lecture) => {
                                    const videoId = getYouTubeVideoId(lecture.videoUrl);
                                    const thumbnailUrl = videoId
                                        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                                        : null;

                                    return (
                                        <div key={lecture._id} className="bg-[#171717] p-4 rounded-2xl shadow-md cursor-pointer">
                                            {thumbnailUrl ? (
                                                <img
                                                    src={thumbnailUrl}
                                                    alt={lecture.title}
                                                    className="w-full h-40 md:h-60 object-cover rounded-lg mb-4"
                                                />
                                            ) : (
                                                <div className="h-40 md:h-60 bg-gray-700 flex justify-center items-center rounded-lg w-full">
                                                    <p className="text-gray-300">No image available</p>
                                                </div>
                                            )}
                                            <h2 className="text-2xl font-semibold text-ellipsis line-clamp-2">{lecture.title}</h2>
                                            <p className="text-gray-400">{lecture.description}</p>
                                            <div className="mt-4 flex flex-col gap-2">
                                            </div>
                                            <button
                                                className="bg-[#24cfa6] font-semibold text-black py-2 px-4 rounded-lg flex flex-nowrap justify-center items-center"
                                                onClick={() => handleLectureClick(lecture.videoUrl)}
                                            >
                                                <FaVideo className="mr-2" />
                                                Watch Lecture
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="border-t w-full">
                <Footer />
            </div>
        </div>
    );
}

export default CourseLectures;
