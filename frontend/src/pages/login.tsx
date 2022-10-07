import React, {useReducer} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import {CardMedia} from "@mui/material";

// webpack workaround for images (disabling esloader did not work)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require("../../public/logo.png").default;

const styles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexWrap: "wrap",
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: "center"
        },
        card: {
            marginTop: theme.spacing(10)
        },
        logo: {
            height: 0,
            width: "full",
            paddingTop: "56.25%",
            marginTop: "30"
        }
    })
);

//state type

type State = {
    email: string;
    password: string;
    helperText: string;
    isError: boolean;
};

const initialState: State = {
    email: "",
    password: "",
    helperText: "",
    isError: false
};

type Action =
    | {type: "setEmail"; payload: string}
    | {type: "setPassword"; payload: string}
    | {type: "loginSuccess"; payload: string}
    | {type: "loginFailed"; payload: string}
    | {type: "setIsError"; payload: boolean};

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
    const classes = styles();
    const [state, dispatch] = useReducer(reducer, initialState);

    // This is temporary, use a login endpoint from the api here later
    const handleLogin = () => {
        if (state.email === "abc@email.com" && state.password === "password") {
            dispatch({
                type: "loginSuccess",
                payload: "Login Successfully"
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
        <form className={classes.container} noValidate autoComplete="off">
            <img src={logo} />
            <Card className={classes.card}>
                <CardMedia
                    className={classes.logo}
                    component="img"
                    alt="Toronto Early Cognition Lab"
                    image={logo}
                />
                <CardHeader className={classes.header} title="Login App" />
                <CardContent>
                    <div>
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="email"
                            type="email"
                            label="email"
                            placeholder="Email"
                            margin="normal"
                            onChange={handleEmailChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            helperText={state.helperText}
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.loginBtn}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default Login;
