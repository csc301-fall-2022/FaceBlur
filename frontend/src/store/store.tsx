import {configureStore} from "@reduxjs/toolkit";
import {reducer} from "./auth-reducer";

export const store = configureStore({
    reducer: reducer,
    preloadedState: {
        email: "",
        password: "",
        helperText: "",
        isError: false,
        loggedIn: false
    }
});

console.log(store.getState());
