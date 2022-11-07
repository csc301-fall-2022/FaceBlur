import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({videoLink}: VideoProps) => (
    <>
        <ReactPlayer playing url={videoLink} width="100%" height="85vh" />
    </>
);
export default VideoPlayer;
