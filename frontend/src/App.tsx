import React from "react";
import LoginForm from "./pages/login";
import HomePage from "./home-page/HomePage";
// import NavBar from "components/common";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// https://v5.reactrouter.com/web/guides/quick-start

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};
export default App;
