import React from 'react';
import Navbar from '../components/Navbar';
import CountUp from 'react-countup';

function Home() {
    return (
        <>
            <div className='relative h-full '>

                <div className="fixed z-10 w-full backdrop-blur-sm">
                    {/* Navbar */}
                    <Navbar />
                </div>

                {/* Main Content */}
                <div className='flex flex-col justify-center items-center w-full'>

                    <div className="flex flex-col w-full items-center h-screen transition-all duration-200">
                        {/* Background Image */}
                        <img src="/bg.svg" alt="Background Illustration" className="w-full " />

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
                            <button className="mt-12 bg-[#24cfa6] text-base md:text-xl font-semibold px-6 py-2 md:px-8 md:py-2 rounded-md hover:bg-[#24cfa7ea] transition-all duration-200">
                                Check Courses - Make an Impact
                            </button>

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
                    <div className='text-white text-xl md:text-4xl md:max-w-3xl  text-center font-bol font-mono  md:py-20 px-4 absolute md:relative md:bottom-0 -bottom-10 ' >
                        <p>we do whatever it takes to help you <span className='text-[#24cfa6]'>understand the concepts</span></p>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
