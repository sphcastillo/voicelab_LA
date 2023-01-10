import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./redux/reducers";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

