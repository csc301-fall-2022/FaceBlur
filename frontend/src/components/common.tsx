import React from "react";
//import Popover from '@mui/material/Popover';
import PersonIcon from "@mui/icons-material/Person";
import {CardMedia, IconButton, Stack} from "@mui/material";

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Stack direction="row" justifyContent="space-between">
                    <CardMedia
                        component="img"
                        alt="Toronto Early Cognition Lab"
                        image="/logo.png"
                        sx={{width: 0.1, margin: 1}}
                    />
                    <IconButton
                        sx={{
                            bgcolor: "#BDBDBD",
                            width: 40,
                            height: 40,
                            color: "white",
                            margin: 1.5,
                            "&:hover": {bgcolor: "#747779"}
                        }}
                    >
                        <PersonIcon />
                    </IconButton>
                </Stack>
            </div>
        );
    }
}

export default NavBar;