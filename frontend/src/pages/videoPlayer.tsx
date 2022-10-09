import React from "react";
import {DefaultPlayer as Video} from "react-html5video";
import "react-html5video/dist/styles.css";

const VideoPlayer: React.FC = () => (
    <Video
        autoPlay
        loop
        muted
        controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
        poster="http://sourceposter.jpg"
        onCanPlayThrough={() => {
            // Do stuff
        }}
    >
        <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4" />
        <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
    </Video>
);
export default VideoPlayer;
