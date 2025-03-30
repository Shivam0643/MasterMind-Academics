import React from 'react';
import Navbar from '../components/Navbar';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import FeaturedCourses from './FeaturedCourses';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <div className='relative h-full bg-[#0c0c0c]'>

                <div className="fixed z-10 w-full backdrop-blur-sm">
                    {/* Navbar */}
                    <Navbar />
                </div>

                {/* Main Content */}
                <div className='flex flex-col justify-center items-center w-full'>

                    <div className="flex flex-col w-full items-center h-screen transition-all duration-200">
                        {/* Background Image */}
                        <img src="/bg.svg" alt="Background Illustration" className="w-full" />

                        {/* Additional Content */}
                        <div className="absolute text-center max-w-7xl  flex flex-col py-44 md:justify-center items-center transition-all duration-200 px-4">
                            {/* Text Content */}
                            <div className="text-4xl md:text-5xl font-mono text-white transition-all duration-200">
                                <span className='transition-all duration-200'>
                                    The pursuit of <span className="text-[#24cfa6]">knowledge</span>
                                </span>
                                <br />
                                <span className='transition-all duration-200'>
                                    fuels dreams and unlocks endless
                                </span>
                                <br />
                                <span className="italic transition-all duration-200">
                                    possibilities.
                                </span>
                            </div>

                            {/* Button */}
                            <Link to={'/courses'} className="mt-12 bg-[#24cfa6] text-base md:text-xl font-semibold px-6 py-2 md:px-8 md:py-2 rounded-md hover:bg-[#24cfa7ea] transition-all duration-200">
                                Check Courses - Make an Impact
                            </Link>

                            {/* Spacer */}
                            <div className="mt-20"></div> {/* Add this line to control the space between the text and the counters */}

                            {/* Counter Grid */}
                            <div className="absolute bottom-20 md:bottom-4 grid grid-cols-3 gap-3 md:gap-20 mb-20 text-white transition-all duration-200 ">

                                <div className="flex flex-col flex-nowrap justify-center items-center">
                                    <span className="font-bold text-xl md:text-3xl transition-all duration-200">
                                        <CountUp start={0} end={25} duration={3} separator="," />k+
                                    </span>
                                    <span className="font-semibold text-xs md:text-xl">Students taught</span>
                                </div>

                                <div className="flex flex-col flex-nowrap justify-center items-center">
                                    <span className="font-bold text-xl md:text-3xl transition-all duration-200">
                                        <CountUp start={0} end={18} duration={3} separator="," />+
                                    </span>
                                    <span className="font-semibold text-xs md:text-xl">Instructors</span>
                                </div>

                                <div className="flex flex-col flex-nowrap justify-center items-center">
                                    <span className="font-bold text-xl md:text-3xl transition-all duration-200">
                                        <CountUp start={0} end={140} duration={3} separator="," />+
                                    </span>
                                    <span className="font-semibold text-xs md:text-xl">Courses completed</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='text-white text-xl md:text-4xl md:max-w-3xl  text-center font-bol font-mono px-4 space-y-16' >
                        <img src="learn.png" alt="learn" className='border border-white rounded-xl shadow-lg' />
                        <p>we do whatever it takes to help you <span className='text-[#24cfa6]'>understand the concepts</span></p>
                    </div>
                    <div className='w-full pt-20 pb-10 md:py-36 '>
                        <h1 className='pb-4 md:pb-10 px-6 md:px-20 text-2xl md:text-4xl font-bold font-mono text-white'>Courses Offered.</h1>
                        <FeaturedCourses />
                    </div>

                    {/* last section */}
                    <div className='flex flex-col justify-center items-center text-white  w-full py-10 space-y-20'>
                        <p className='font-mono text-2xl md:text-5xl max-w-xs md:max-w-3xl text-center px-4'>Top <span className='text-[#24cfa6]'>companies</span> our students working with</p>
                        <img src="companies.webp" alt="companies" className=' md:max-w-7xl px-10' />
                       
                    </div>

                    {/* footer */}
                    <div className='border-t w-full'>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
