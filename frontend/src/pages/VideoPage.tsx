import React from "react";
import FileSaver from "file-saver";
import NavBar from "../components/common";
import VideoPlayer from "../components/VideoPlayer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useNavigate, useLocation} from "react-router-dom";

const VideoPage = () => {
    const {
        state: {link}
    } = useLocation();

    /**
     * Downloads the video file from the video link
     * @param videoLink Presigned URL to a video stored in a s3 object
     */
    function download(videoLink: string) {
        FileSaver.saveAs(videoLink);
    }
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
            <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                style={{maxHeight: "500px"}}
            >
                <Grid item xs={12}>
                    <Card sx={{width: 0.65, margin: "auto"}}>
                        <CardContent>
                            <Button
                                onClick={() => navigate(-1)}
                                variant="contained"
                                sx={{marginLeft: "auto", marginBottom: 1}}
                            >
                                Back
                            </Button>
                            <VideoPlayer videoLink={link} />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                sx={{marginLeft: "auto"}}
                                onClick={() => download(link)}
                            >
                                Download
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default VideoPage;
