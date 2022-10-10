import React from "react";
import VideoPage from "./pages/videoPage";

const videoLink =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

const App: React.FC = () => <VideoPage videoLink={videoLink} />;

export default App;
