import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { BACKEND_URL } from "../utils/utils";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin ? admin.token : null;

  if (!token) {
    toast.error("Please login to admin")
  }

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        // Simulate a delay of 2 seconds before updating the state
        setTimeout(() => {
          setCourses(response.data.courses); // Assuming response data has a "courses" key.
          setLoading(false);
        }, 2000); // 2-second delay
      } catch (error) {
        console.log("Error in fetching courses", error);
        toast.error("Failed to fetch courses.");
      }
    };
    fetchCourses();
  }, []);

  // Delete course
  const handleDelete = async (id) => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (!admin || !admin.token) {
      console.log("Token not found in localStorage");
      toast.error("No token found, please log in.");
      return;
    }

    const token = admin.token;
    console.log("Token used for deletion:", token);  // Make sure token is available

    try {

      const response = await axios.delete(`${BACKEND_URL}/course/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Delete Response:", response.data);
      toast.success(response.data.message);

      const updatedCourses = courses.filter((course) => course._id !== id);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error in deleting course:", error);
      if (error.response) {
        console.error("Response error:", error.response);
        toast.error(error.response.data.errors || "Error in deleting course");
      } else {
        toast.error("An unknown error occurred. Please try again later.");
      }
    }
  };



  return (
    <div className="p-6 bg-[#0c0c0c] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Our Courses</h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="loader"></div>
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center text-lg">No courses found. Please add some courses.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#171717] p-4 rounded shadow hover:shadow-lg transition-all duration-500"
            >
              <div className="flex justify-center">
                <img src={course.image.url} alt="img" className="h-56" />
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="mb-2">{course.description}</p>
              <p className="text-[#24cfa6] font-bold mb-4">₹{course.price}</p>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center space-x-2"
              >
                <FaTrash /> <span>Delete</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OurCourses;
