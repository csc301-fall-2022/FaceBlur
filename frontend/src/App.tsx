import React from "react";
import NavBar from "components/common";
// import VideoPage from "./pages/videoPage";
import HomePage from "./home-page/HomePage";

// const videoLink =
//     "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

// const App: React.FC = () => (
//     <>
//         <NavBar />
//         <VideoPage videoLink={videoLink} />
//     </>
// );

const App: React.FC = () => (
    <div>
        <NavBar />
        <HomePage />
    </div>
);
export default App;
