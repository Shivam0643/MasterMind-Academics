import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { BACKEND_URL } from "../utils/utils";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!token) {
          toast.error("Please login as admin to view courses.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);

        if (error.response?.status === 401) {
          toast.error("Unauthorized. Please login as admin.");
        } else {
          toast.error("Failed to fetch courses.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  const handleDelete = async (id) => {
    if (!token) {
      toast.error("Please login to delete courses.");
      return;
    }

    try {
      const response = await axios.delete(`${BACKEND_URL}/course/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!window.confirm("Are you sure you want to delete this course?")) return;
      toast.success(response.data.message || "Course deleted.");
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);

      const message =
        error.response?.data?.error ||
        error.response?.data?.errors ||
        "Failed to delete course";

      toast.error(message);
    }
  };

  return (
    <div className="p-6 bg-[#0c0c0c] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Our Courses</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="loader" />
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center text-lg text-white">
          No courses found. Please add some courses.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#171717] p-4 rounded shadow hover:shadow-lg transition-all"
            >
              <div className="flex justify-center">
                <img
                  src={course.image?.url || "/default.jpg"}
                  alt={course.title}
                  className="h-56 object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mt-2">{course.title}</h3>
              <p className="my-2">{course.description}</p>
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
