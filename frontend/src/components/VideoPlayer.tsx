import React from "react";
import {DefaultPlayer as Video} from "react-html5video";
import "react-html5video/dist/styles.css";

const VideoPlayer = ({videoLink}: VideoProps) => (
    <Video controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}>
        <source src={videoLink} type="video/mp4" />
        <source src={videoLink} type="video/wmv" />
        <source src={videoLink} type="video/mov" />
    </Video>
);
export default VideoPlayer;
