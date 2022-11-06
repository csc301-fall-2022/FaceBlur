import React from "react";
import LoginForm from "./pages/login";
import HomePage from "./pages/Home";
import VideoPage from "pages/VideoPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/video/:key" element={<VideoPage />} />
            <Route path="/" element={<LoginForm />} />
        </Routes>
    </Router>
);
export default App;
