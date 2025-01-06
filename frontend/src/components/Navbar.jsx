import React from 'react'
import '../App.css';
function Navbar() {
    return (
        <>
            <div className='w-full flex flex-nowrap justify-between items-center py-4 px-20 bg-transparent text-white'>
                <div className='flex flex-nowrap justify-center items-center gap-2'>
                    <img src="/public/logo.webp" alt="logo" className='w-6' />
                    <h1 className='font-mono'>Sheryians coding school</h1>
                </div>
                <div>
                    <ul className='capitalize flex justify-center items-center space-x-10 tracking-tight'>
                        <li className='cursor-pointer'>Home</li>
                        <li className='cursor-pointer'>courses</li>
                        <li className='wiggle font-mono text-red-500 font-semibold tracking-wide cursor-pointer animate 1s ease-in-out infinite'>live course</li>
                        <li className='cursor-pointer'>request callback</li>
                        <button className='bg-[#24cfa6] px-6 py-1 rounded-md text-black'>Sign In</button>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar