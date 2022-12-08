import React from "react";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import {CardMedia} from "@mui/material";
import {AppDispatch, store} from "src/store/store";

import { useDispatch, useSelector } from "react-redux/es/exports";

import * as themes from "../static/themes.css";
import * as login from "../static/login.css";
import Cookies from "js-cookie";

import {State} from "src/store/auth-reducer";

// https://surajsharma.net/blog/react-login-form-typescript

const Login = (props: State) => {
    //const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    // This is temporary, use a login endpoint from the api here later
    const handleLogin = () => {
        fetch("/api/auth/login", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                email: props.email,
                password: props.password
            })
        })
            .then((res) => {
                if (res.status === 200) {
                    store.dispatch({
                        type: "loginSuccess",
                        payload: "Login Successful"
                    });
                    navigate("/home");
                } else {
                    store.dispatch({
                        type: "loginFailed",
                        payload: "Incorrect email or password"
                    });
                }
                return res.json();
            })
            .then((data) => {
                Cookies.set("access", data.token);
            });
    };

    // Handles changing to registration screen
    const handleNoAccount = () => {
        navigate("/register");
    };

    // Handles pressing enter to submit
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };

    // Handles email change in the input element
    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        store.dispatch({
            type: "setEmail",
            payload: event.target.value
        });
    };

    // Handles password change in the input element
    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        store.dispatch({
            type: "setPassword",
            payload: event.target.value
        });
    };
    return (
        <form className={login.container} noValidate autoComplete="off">
            <Card className={login.card} elevation={0}>
                <CardMedia
                    className={login.logo}
                    component="img"
                    alt="Toronto Early Cognition Lab"
                    image={require("../../public/logo.png")}
                    sx={{objectFit: "contain"}}
                />
                <CardHeader className={login.header} title="Log into KidBlur" />
                <CardContent>
                    <div>
                        <TextField
                            error={useSelector(isError: boolean => isError)}
                            fullWidth
                            id="email"
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            onChange={handleEmailChange}
                            onKeyPress={handleKeyPress}
                            variant="outlined"
                        />
                        <TextField
                            error={store.getState().isError}
                            fullWidth
                            id="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            type="password"
                            helperText={store.getState().helperText}
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                            variant="outlined"
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="text"
                        size="large"
                        className={themes.btn}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </CardActions>
                {/* Not implememented yet */}
                <CardContent>
                    <div>Forgot Password?</div>
                </CardContent>
                <CardContent>
                    <a onClick={handleNoAccount}>
                        <u>Don&#39;t have an account yet?</u>
                    </a>
                </CardContent>
            </Card>
        </form>
    );
};

// function mapStateToProps(state: State) {
//     return {
//         state
//     };
// }

export const useAppDispatch: () => AppDispatch = useDispatch

export default Login;
