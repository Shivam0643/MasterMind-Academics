import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Home() {

    return (
        <>
            <div className='relative z-10'>
                {/* Navbar */}
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="absolute top-0 flex flex-col w-full  items-center h-screen">
                {/* Background Image */}
                <img src="/bg.svg" alt="Background Illustration" className="w-full" />
                {/* Additional Content */}
                <div className="absolute  text-center h-full flex flex-col justify-center items-center ">
                    <div className="text-5xl font-mono text-white text-center">
                        <span>
                            The pursuit of <span className='text-[#24cfa6]'>knowledge</span>
                        </span>
                        <br />
                        <span>
                            fuels dreams and unlocks endless
                        </span>
                        <br />
                        <span className=' italic'>
                            possibilities.
                        </span>
                    </div>
                   <button className=' mt-12 bg-[#24cfa6] text-xl font-semibold px-8 py-2 rounded-md hover:bg-[#24cfa7ea] duration-300'>Check Courses - Make an Impact</button>
                </div>
            </div>
        </>
    );
}

export default Home;
