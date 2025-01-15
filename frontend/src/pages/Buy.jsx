import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Buy() {
    const { courseId } = useParams(); // Get the course ID from URL parameters
    const [loading, setLoading] = useState(false); // Manage loading state
    const [token, setToken] = useState(null); // Store token
    const navigate = useNavigate();

    // Fetch token from localStorage when the component mounts
    useEffect(() => {
        const userData = localStorage.getItem('user'); // Get the 'user' item from localStorage
        if (userData) {
            try {
                const user = JSON.parse(userData); // Parse the JSON string
                setToken(user.token); // Extract and store the token
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                toast.error('Invalid user data found. Please log in again.');
                localStorage.removeItem('user'); // Clear invalid data
            }
        } else {
            console.warn('No user data found in localStorage.');
        }
    }, []); // Run only once when the component mounts

    const handlePurchase = async () => {
        if (!token) {
            toast.error('Please login to purchase the course');
            return;
        }

        try {
            setLoading(true); // Start loading
            const response = await axios.post(
                `http://localhost:3000/api/v1/course/buy/${courseId}`,
                {}, // No body content for this request
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in the header
                    },
                    withCredentials: true, // Include cookies in the request
                }
            );
            toast.success(response.data.message || 'Course purchased successfully');
            navigate('/purchases'); // Navigate to purchases page
        } catch (error) {
            setLoading(false); // Stop loading
            console.error('Error during purchase:', error);
            if (error.response?.status === 400) {
                toast.error("You've already purchased the course");
            } else {
                toast.error(error?.response?.data?.errors || 'An error occurred');
            }
        } finally {
            setLoading(false); // Ensure loading stops
        }
    };

    return (
        <div className='flex h-screen items-center justify-center'>
            <button
                onClick={handlePurchase}
                disabled={loading}
                className={`py-2 px-6 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Processing...' : 'Buy Now'}
            </button>
        </div>
    );
}

export default Buy;
