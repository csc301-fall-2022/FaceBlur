import React, {useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
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
    | {type: "registrationSuccess"; payload: string}
    | {type: "registrationFailed"; payload: string}
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
        case "registrationSuccess":
            return {
                ...state,
                helperText: action.payload,
                isError: false
            };
        case "registrationFailed":
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

const Register = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [response, setResponse] = useState(0);
    const navigate = useNavigate();

    // This is temporary, use a login endpoint from the api here later
    const handleRegister = () => {
        fetch("/api/auth/register", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                email: state.email,
                password: state.password
            })
        }).then((res) => setResponse(res.status));

        if (response === 200) {
            dispatch({
                type: "registrationSuccess",
                payload: "Registration Successful"
            });
            navigate("/home");
        } else {
            dispatch({
                type: "registrationFailed",
                payload: "Email in use"
            });
        }
    };

    // Handles pressing enter to submit
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleRegister();
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
                <CardHeader className={login.header} title="Register to <App Name>" />
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
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                </CardActions>
                {/* Not implememented yet */}
                <CardContent>
                    <a href="/">Already have an account?</a>
                </CardContent>
            </Card>
        </form>
    );
};

export default Register;