import React, {useState} from "react";
//import Popover from '@mui/material/Popover';
import PersonIcon from "@mui/icons-material/Person";
import {CardMedia, IconButton, Stack, Button} from "@mui/material";
import "./common.css";

export default function NavBar() {
    const [showLogout, setShowLogout] = useState(false);

    const handleHover = () => {
        setShowLogout(true);
    };

    const handleExit = () => {
        setShowLogout(false);
    };
    return (
        <div>
            <Stack direction="row" justifyContent="space-between" sx={{padding: 2}}>
                <CardMedia
                    component="img"
                    alt="Toronto Early Cognition Lab"
                    image="/logo.png"
                    sx={{width: 0.15}}
                />
                <IconButton
                    sx={{
                        bgcolor: "#BDBDBD",
                        width: 40,
                        height: 40,
                        color: "white",
                        marginTop: 1,
                        "&:hover": {bgcolor: "#BDBDBD"}
                    }}
                    onMouseEnter={handleHover}
                >
                    <PersonIcon />
                </IconButton>
                {showLogout && (
                    <div className="logout" onMouseLeave={handleExit}>
                        <Button sx={{color: "white", "&:hover": {bgcolor: "#BDBDBD"}}}>
                            Logout
                        </Button>
                    </div>
                )}
            </Stack>
        </div>
    );
}
