import React from "react";
import HomePage from "./pages/Home";
import NavBar from "components/common";

// const videoLink =
//     "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

const App: React.FC = () => (
    <div>
        <NavBar />
        <HomePage />
    </div>
);
export default App;
