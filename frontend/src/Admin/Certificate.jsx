import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Certificate = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    // Fetch students and courses from backend
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users");
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching students", error);
            }
        };

        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/courses");
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses", error);
            }
        };

        fetchStudents();
        fetchCourses();
    }, []);

    // Handle certificate creation
    const handleCreateCertificate = async (e) => {
        e.preventDefault();

        if (!selectedStudent || !selectedCourse) {
            toast.error("Please select a student and a course.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/certificates/create",
                {
                    studentId: selectedStudent,
                    courseId: selectedCourse,
                    courseName: courses.find(course => course._id === selectedCourse)?.name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                }
            );

            toast.success("Certificate created successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error creating certificate", error);
            toast.error("Failed to create certificate");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6">Create Certificate</h2>
                <form onSubmit={handleCreateCertificate}>
                    <label className="block mb-2">Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    >
                        <option value="">Choose a student</option>
                        {students.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.firstName} {student.lastName}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2">Select Course:</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    >
                        <option value="">Choose a course</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.name}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Create Certificate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Certificate;