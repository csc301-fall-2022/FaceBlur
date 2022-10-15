import React from "react";
import NavBar from "components/common";
import HomePage from "./home-page/HomePage";

// const videoLink =
//     "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

const App: React.FC = () => (
    <div>
        <NavBar />
        <HomePage />
    </div>
);
export default App;
