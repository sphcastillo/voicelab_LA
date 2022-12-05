import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import authReducer from "./reducers/auth";

const middleware = [thunk];
const store = configureStore(
    authReducer,
    applyMiddleware(...middleware)
);

export default store;