import React from "react";
import Register from "./pages/register";
import Login from "./pages/login";
import HomePage from "./pages/Home";
import VideoPage from "pages/VideoPage";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import ProtectedRoute from "src/components/protected-routes";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/video" element={<VideoPage />} />
                </Route>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};
export default App;
