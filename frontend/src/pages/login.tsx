import React, {useReducer} from "react";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import {CardMedia} from "@mui/material";

import * as themes from "../static/themes.css";
import * as login from "../static/login.css";

// https://surajsharma.net/blog/react-login-form-typescript

// login state type
type State = {
    email: string;
    password: string;
    helperText: string;
    isError: boolean;
};

// initial state of login
const initialState: State = {
    email: "",
    password: "",
    helperText: "",
    isError: false
};

// possible actions to take for updating State
type Action =
    | {type: "setEmail"; payload: string}
    | {type: "setPassword"; payload: string}
    | {type: "loginSuccess"; payload: string}
    | {type: "loginFailed"; payload: string}
    | {type: "setIsError"; payload: boolean};

// update function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "setEmail":
            return {
                ...state,
                email: action.payload
            };
        case "setPassword":
            return {
                ...state,
                password: action.payload
            };
        case "loginSuccess":
            return {
                ...state,
                helperText: action.payload,
                isError: false
            };
        case "loginFailed":
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case "setIsError":
            return {
                ...state,
                isError: action.payload
            };
    }
};

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // This is temporary, use a login endpoint from the api here later
    const handleLogin = () => {
        if (state.email === "abc@email.com" && state.password === "password") {
            dispatch({
                type: "loginSuccess",
                payload: "Login Successful"
            });
        } else {
            dispatch({
                type: "loginFailed",
                payload: "Incorrect email or password"
            });
        }
    };

    // Handles pressing enter to submit
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };

    // Handles email change in the input element
    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: "setEmail",
            payload: event.target.value
        });
    };

    // Handles password change in the input element
    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
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
                <CardHeader className={login.header} title="Log into <App Name>" />
                <CardContent>
                    <div>
                        <TextField
                            error={state.isError}
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
                            error={state.isError}
                            fullWidth
                            id="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            type="password"
                            helperText={state.helperText}
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
            </Card>
        </form>
    );
};

export default Login;
