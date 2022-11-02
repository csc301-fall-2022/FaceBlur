import React from "react";
//import Popover from '@mui/material/Popover';
import PersonIcon from "@mui/icons-material/Person";
import {CardMedia, IconButton, Stack, CardActionArea} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Stack direction="row" justifyContent="space-between" sx={{padding: 2}}>
                <CardActionArea onClick={() => navigate("/home")}>
                    <CardMedia
                        component="img"
                        alt="Toronto Early Cognition Lab"
                        image="/logo.png"
                        sx={{width: 0.15}}
                    />
                </CardActionArea>
                <IconButton
                    sx={{
                        bgcolor: "#BDBDBD",
                        width: 40,
                        height: 40,
                        color: "white",
                        marginTop: 1,
                        "&:hover": {bgcolor: "#747779"}
                    }}
                >
                    <PersonIcon />
                </IconButton>
            </Stack>
        </div>
    );
};

export default NavBar;
