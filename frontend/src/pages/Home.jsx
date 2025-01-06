import React from 'react';
import Navbar from '../components/Navbar';

function Home() {
    return (
        <>
            <div className='relative z-10'>

                {/* Navbar */}
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="absolute top-0 flex flex-col w-full  items-center h-screen bg-gray-100">
                {/* Background Image */}
                <img
                    src="/bg.svg"
                    alt="Background Illustration"
                    className="w-full"
                />

                {/* Additional Content */}
                <div className="absolute mt-20 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome to Home</h1>
                    <p className="text-lg text-gray-600 mt-4">
                        This is the home page of your application.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Home;
