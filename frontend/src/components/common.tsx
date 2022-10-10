import React from "react";
import SearchIcon from "@mui/icons-material/Search";
//import Popover from '@mui/material/Popover';
import PersonIcon from "@mui/icons-material/Person";
import {CardMedia, InputAdornment, TextField, IconButton, Stack} from "@mui/material";

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Stack direction="row">
                    <CardMedia
                        component="img"
                        alt="Toronto Early Cognition Lab"
                        image="../../public/logo.png"
                    />
                    <IconButton>
                        <PersonIcon />
                    </IconButton>
                </Stack>
                <TextField
                    id="outlined-start-adornment"
                    variant="outlined"
                    fullWidth
                    placeholder="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </div>
        );
    }
}

export default NavBar;
