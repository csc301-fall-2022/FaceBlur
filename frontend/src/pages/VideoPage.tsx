import React from "react";
import FileSaver from "file-saver";
import NavBar from "../components/common";
import VideoPlayer from "../components/VideoPlayer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useNavigate, useParams} from "react-router-dom";

const VideoPage = () => {
    let {key} = useParams();
    if (key === undefined) {
        key = "";
    }
    // const link = "https://tecl-testing.s3.amazonaws.com/" + key.replace(/ /g, "+");
    const link = "https://tecl-private-testing.s3.us-east-2.amazonaws.com/pexels-mart-production-8075171.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJIMEYCIQDa6oop7q6rQNmSGLCFtlJQbgP3%2FPILs3g1c2lblqksjAIhALmC2WSuDPdX52o4poNxhJBHaMO4%2Fi6lE%2BbG952g6FFqKoQDCJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNzQ4MjU5ODU1NTU4IgyvOdFQTOl8Mxmyi8Iq2AKyJJnvbVh9UMW6JYIlFdXR6rJ8VKpar3DC2Havm4Nh6F6JHeoGWtLMAL5a8Zb0nRUA8rdOLPk6GHonsbYDB72SQkpiFG%2F8MFluDW4L2Sbn0t2dIuO8rEFmG9r1%2FRraVg8uYKmhbpIP8vJtI1R3Ylw1W%2BcCx3ol2YIsFOCawKFHxs4xVWrhJ%2F%2BqKqWycMcod9moa9GWdkkikVxYRhyJwbrtept1JqMwg1iizWNt17jJ2ga1%2BPiFsj1B8%2BIagr4m8DmIIvXgZEuGermY4PyQbJG1poZuQh0LUIbWvdEpeiWm%2BgYNIuQAkjfcXR9SOXzmTkNnpZjBkhi%2FWsqaF0JD55DdE7HLY3j30yJCT69fP9USr5mS7UHp0oLNQT7j%2BVkBEtogUv6tq3uwF6Hyy1NnZigS3UUQyCj8g6Hqzqkn6pNOTSPW1J8MRgDiXkNEuQGvexq2Ek16XsTofTD1sqOcBjqyAlZbe8M7KFkUOPNHqhUa%2FMhwf8Vp5pw0f5X5QUEfEOzgJBZWxVyXYFglX%2F571r7Chx21kYFcaHZdF8vhzcCJCcCB11eiHH6yQQEOYxQpnyRL9rbi9XmDnjkG%2Fl7CWZb8d%2BH8GwSmdBwxhMmz1LsrqmOeZGhPX0nuIprpiGDrr6QJCAVKIsz2GvxN7aGcFJLUG2X4xcWuI3sFv6soLhdh%2FFAmoco4Ymryo%2Fvcwan6mfvMligdOaxvlJ3600HqDzrdqZ1Zj4OLCiV6Mr%2BxCNilr0q%2BjCWcIGjTRH4fZz1Vr8mR1oc5EDIlRpX103xjEZt4WtKn1nCLXEte7Q4TBUXgZ0PmMQJniF2ChZw8EtgT44dR5tYS5QjiQf0ohzpQW4A3Sgc5K8aErmoe0q0rmGyqaplyAw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221201T164619Z&X-Amz-SignedHeaders=host&X-Amz-Expires=39600&X-Amz-Credential=ASIA24N6DJTDGKLTXSHT%2F20221201%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=961cf93e8db57bb71d5f9c7529e2a0be7010a5cd7d1345a2ef2fb55f598d78ed"

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
