import {configureStore} from "@reduxjs/toolkit";
import {reducer, initialState} from "./auth-reducer";
import { combineReducers } from "@reduxjs/toolkit";
//const enhancer = window.REDUX_DEVTOOLS_EXTENSION &&window.REDUX_DEVTOOLS_EXTENSION()
const rootReducer = combineReducers({
    authReducer: reducer
});

export const store = configureStore({
    reducer: rootReducer
    // enhancers: enhancer
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch