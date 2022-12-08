import React, {useState} from "react";
//import Popover from '@mui/material/Popover';
import PersonIcon from "@mui/icons-material/Person";
import {CardMedia, IconButton, Stack, Button, CardActionArea} from "@mui/material";
import * as common from "../static/common.css";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export default function NavBar() {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);

    const handleHover = () => {
        setShowLogout(true);
    };

    const handleExit = () => {
        setShowLogout(false);
    };

    const logout = () => {
        Cookies.remove("access");
        localStorage.clear();
        const path = "/";
        navigate(path);
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
                        bgcolor: "#777676",
                        width: 40,
                        height: 40,
                        color: "white",
                        marginTop: 1,
                        "&:hover": {bgcolor: "#777676"}
                    }}
                    onMouseEnter={handleHover}
                >
                    <PersonIcon />
                </IconButton>
                {showLogout && (
                    <div className={common.logout} onMouseLeave={handleExit}>
                        <Button
                            sx={{color: "white", "&:hover": {bgcolor: "#777676"}}}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </Stack>
        </div>
    );
}
