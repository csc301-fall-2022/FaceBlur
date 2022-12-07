import React from "react";
import Register from "./pages/register";
import Login from "./pages/login";
import HomePage from "./pages/Home";
import VideoPage from "pages/VideoPage";
import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {store} from "src/store/store";

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {store.getState().loggedIn ? (
                <Route path="/home" element={<HomePage />} />
            ) : (
                <Navigate to="/" />
            )}

            {store.getState().loggedIn ? (
                <Route path="/video/:key" element={<VideoPage />} />
            ) : (
                <Navigate to="/" />
            )}
        </Routes>
    </Router>
);

export default App;
