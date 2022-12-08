import React from "react";
import Register from "./pages/register";
import Login from "./pages/login";
import HomePage from "./pages/Home";
import VideoPage from "pages/VideoPage";
import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Cookies from "js-cookie";

const cookie = Cookies.get("access");
const App: React.FC = () => (
    <Router>
        <Routes>
            {/* {cookie ? <Route path="/home" element={<HomePage />} /> : <Navigate to="/" />} */}
            <Route path="/home" element={cookie ? <HomePage /> : <Navigate replace to={"/"} />} />
            {/* <Route
                path="/video/:key"
                element={cookie ? <VideoPage /> : <Navigate replace to={"/"} />}
            /> */}

            {cookie ? <Route path="/video/:key" element={<VideoPage />} /> : <Navigate to="/" />}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
);
export default App;
