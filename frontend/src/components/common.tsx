import React, {useState} from "react";
//import Popover from '@mui/material/Popover';
import PersonIcon from "@mui/icons-material/Person";
import {CardMedia, IconButton, Stack, Button, CardActionArea} from "@mui/material";
import "./common.css";
import {useNavigate} from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
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
