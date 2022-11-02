import React from "react";
import FileSaver from "file-saver";
import NavBar from "../components/common";
import VideoPlayer from "../components/VideoPlayer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";

const VideoPage = () => {
    //TODO: swap this out to get from params using useParams & add typeguard for undefined
    const link =
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

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
                style={{minHeight: "100vh"}}
            >
                <Grid item xs={12}>
                    <Card sx={{width: 0.7, margin: "auto"}}>
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
