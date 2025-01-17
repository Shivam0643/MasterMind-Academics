import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa'; // You can add other icons if needed

function Footer() {
    return (
        <footer className="bg-[#0c0c0c] text-white py-16">
            <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
                {/* Footer heading with logo */}
                <div className='flex flex-col justify-center items-center flex-nowrap cursor-pointer'>
                    <div className='text-3xl font-bold'>
                        <span>M</span>
                        <span className='text-[#24cfa6]'>A</span>
                    </div>
                    <span className="tracking-wider font-semibold">MasterMind Academix</span>
                </div>

                {/* Social media links */}
                <div className="flex justify-center space-x-8">
                    <Link
                        to="https://www.linkedin.com/in/shreyash-thaware-168718264/"
                        className="text-2xl hover:text-[#24cfa7] transition-all duration-200"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </Link>
                    <Link
                        to="https://github.com/Shreyashthaware2003"
                        className="text-2xl hover:text-[#24cfa7] transition-all duration-200"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <FaGithub />
                    </Link>
                    <Link
                        to="https://mail.google.com/mail/u/0/?fs=1&to=shreyashthaware284@gmail.com&tf=cm"
                        className="text-2xl hover:text-[#24cfa7] transition-all duration-200"
                        target='_blank'
                    >
                        <FaEnvelope />
                    </Link>
                    <Link
                        to="https://www.instagram.com/shrreyy.17/"
                        className="text-2xl hover:text-[#24cfa7] transition-all duration-200"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <FaInstagram />
                    </Link>
                </div>

                {/* Links Section */}
                <div className="flex justify-center space-x-12 text-base md:text-xl">
                    <Link to="/" className="hover:text-[#24cfa7] transition-all duration-200">About</Link>
                    <Link to="/" className="hover:text-[#24cfa7] transition-all duration-200">Contact</Link>
                    <Link to="/" className="hover:text-[#24cfa7] transition-all duration-200">Terms</Link>
                    <Link to="/" className="hover:text-[#24cfa7] transition-all duration-200">Privacy</Link>
                </div>

                {/* Footer Bottom */}
                <div className="text-sm mt-8">
                    <p>&copy; {new Date().getFullYear()} Your Website. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
