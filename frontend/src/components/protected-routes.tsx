import React from "react";
import {Navigate, Outlet} from "react-router-dom";

/**
 * loggedIn is found in local storage
 * @returns null if not logged in, route if logged in
 */
function ProtectedRoute() {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn === undefined) {
        return null;
    }
    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
