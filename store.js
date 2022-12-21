import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./redux/reducers";

const middleware = [thunk];

// const store = configureStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

const rootReducer = combineReducers({
    authReducer: reducer
})

const store = configureStore(
    rootReducer,
)

export default store;