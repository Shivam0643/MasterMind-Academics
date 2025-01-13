import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <Link to={'/'} className="w-full min-h-screen flex items-center justify-center bg-[radial-gradient(at_50%_-20%,_#908392,_#0d060e)]">
           
                <img
                    src="/404.svg"
                    className="max-w-6xl object-contain"
                    alt="404 Error Illustration"
                />
            
        </Link>
    );
};

export default Error;
