import React from "react";
//import Popover from '@mui/material/Popover';
import PersonIcon from "@mui/icons-material/Person";
import {CardMedia, IconButton, Stack} from "@mui/material";
import {Link} from "react-router-dom";

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Stack direction="row" justifyContent="space-between" sx={{padding: 2}}>
                    <Link to={"/home"}>
                        <CardMedia
                            component="img"
                            alt="Toronto Early Cognition Lab"
                            image="/logo.png"
                            sx={{width: 0.15}}
                        />
                    </Link>
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
    }
}

export default NavBar;
