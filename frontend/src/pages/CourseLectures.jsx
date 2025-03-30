import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaVideo } from "react-icons/fa";

function CourseLectures() {
    const { courseId } = useParams();
    const [lectures, setLectures] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [loading, setLoading] = useState(true);

    // Function to extract YouTube video ID, handling extra parameters
    const getYouTubeVideoId = (url) => {
        const regExp =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.*\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s]*)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const courseResponse = await axios.get(`${BACKEND_URL}/courses/${courseId}`, {
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
                setLoading(false);
            } catch (error) {
                console.error("Error fetching lectures", error);
                setLoading(false);
            }
        };

        fetchCourseDetails();
        fetchLectures();
    }, [courseId]);

    const handleLectureClick = (videoUrl) => {
        window.open(videoUrl, "_blank");
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
                            <div className="font-mono flex flex-col flex-nowrap pb-10 md:pb-20 space-y-6 md:space-y-10 transition-all duration-500">
                                <p className="text-4xl md:text-7xl font-mono md:max-w-4xl md:text-start text-center">
                                    Lectures for <span className="text-[#24cfa6]">{courseName || "Loading..."}</span>
                                </p>
                                <p className="text-base md:text-2xl font-mono md:text-start text-center">Learn and grow with these lectures</p>
                            </div>
                            <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {lectures.map((lecture) => {
                                    // Extract video ID and generate thumbnail URL
                                    const videoId = getYouTubeVideoId(lecture.videoUrl);
                                    const thumbnailUrl = videoId
                                        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                                        : null;

                                    return (
                                        <div
                                            key={lecture._id}
                                            className="bg-[#171717] p-4 rounded-2xl shadow-md cursor-pointer"
                                            onClick={() => handleLectureClick(lecture.videoUrl)}
                                        >
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
                                            <div className="mt-4 flex items-center">
                                                <button
                                                    className="bg-[#24cfa6] font-semibold text-black py-2 px-4 rounded-lg flex flex-nowrap justify-center items-center"
                                                    onClick={() => handleLectureClick(lecture.videoUrl)}
                                                >
                                                    <FaVideo className="mr-2" />
                                                    Watch Lecture
                                                </button>
                                            </div>
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
