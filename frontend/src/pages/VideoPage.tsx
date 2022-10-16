import React from "react";
import FileSaver from "file-saver";
import NavBar from "../components/common";
import VideoPlayer from "../components/VideoPlayer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";


const videoPage = ({videoLink}: VideoProps) => {
    function download() {
        FileSaver.saveAs(videoLink);
    }
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
                            <VideoPlayer videoLink={videoLink} />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                sx={{marginLeft: "auto"}}
                                onClick={() => download()}
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

export default videoPage;
