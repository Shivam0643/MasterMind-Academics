import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { BACKEND_URL } from "../utils/utils";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // directly get token

  // Show error if token is missing
  useEffect(() => {
    if (!token) {
      toast.error("Please login to admin");
    }
  }, [token]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });

        setTimeout(() => {
          setCourses(response.data.courses);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log("Error in fetching courses", error);
        toast.error("Failed to fetch courses.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Delete course
  const handleDelete = async (id) => {
    if (!token) {
      toast.error("No token found, please log in.");
      return;
    }

    try {
      const response = await axios.delete(`${BACKEND_URL}/course/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success(response.data.message);
      setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
    } catch (error) {
      console.error("Error in deleting course:", error);
      toast.error(error.response?.data?.error || "Error in deleting course");
    }
  };

  return (
    <div className="p-6 bg-[#0c0c0c] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Our Courses</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center text-lg text-white">
          No courses found. Please add some courses.
        </p>
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
