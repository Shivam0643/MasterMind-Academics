import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedAdminRoute = () => {
    const token = localStorage.getItem("adminToken");
    console.log("Token:", token);  // Debugging

    if (!token) {
        console.log("Unauthorized - Redirecting to login");
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
