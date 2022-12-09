import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./reducers";

const rootReducer = combineReducers({ userReducer });

export const store = configureStore(rootReducer, applyMiddleware(thunk));
