import React from "react";
import HomePage from "./pages/Home";
import VideoPage from "pages/VideoPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/video" element={<VideoPage />} />
        </Routes>
    </Router>
);
export default App;
