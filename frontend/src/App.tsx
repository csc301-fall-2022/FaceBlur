import React, {useEffect, useState} from "react";
import HomePage from "./pages/Home";
import VideoPage from "pages/VideoPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const SanityCheck = () => {
    const [text, setText] = useState("");
    useEffect(() => {
        fetch("/api/sanity_check")
            .then((data) => data.text())
            .then((dataText) => setText(dataText));
    }, []);
    return <div>{text}</div>;
};

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<SanityCheck />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/video" element={<VideoPage />} />
        </Routes>
    </Router>
);
export default App;
