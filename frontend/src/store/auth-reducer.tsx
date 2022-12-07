// login state type
type State = {
    email: string;
    password: string;
    helperText: string;
    isError: boolean;
    loggedIn: boolean;
};

// initial state of login
export const initialState: State = {
    email: "",
    password: "",
    helperText: "",
    isError: false,
    loggedIn: false
};

// possible actions to take for updating State
type Action =
    | {type: "setEmail"; payload: string}
    | {type: "setPassword"; payload: string}
    | {type: "loginSuccess"; payload: string}
    | {type: "loginFailed"; payload: string}
    | {type: "setIsError"; payload: boolean}
    | {type: "setLogout"; payload: null};

// update function
export const reducer = (state: State = initialState, action: Action): State => {
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
                isError: false,
                loggedIn: true
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
        case "setLogout":
            return {
                ...state,
                loggedIn: false
            };
    }
};
