import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedAdminRoute = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    console.log("Admin Data:", admin);  // Debugging

    if (!admin || !admin.token) {
        console.log("Unauthorized - Redirecting to login");
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};


export default ProtectedAdminRoute;
