import React from 'react'
import Navbar from '../components/Navbar'
import '../App.css';

function LiveCourse() {
    return (
        <>
            <div className="bg-[#0c0c0c] min-h-screen">
                <div className="fixed top-0 w-full backdrop-blur-sm z-10">
                    <Navbar />
                </div>
                <div className='flex flex-row justify-center items-center h-screen text-white md:text-5xl font-bold tracking-wider gap-2 md:gap-4 px-4'>
                    <p>Live courses will be</p>
                    <span className='wiggle text-red-500 font-mono text-lg md:text-6xl'>Availabe Soon!!</span>
                </div>
            </div>
        </>
    )
}

export default LiveCourse