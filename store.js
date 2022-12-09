// import appReducer from "./reducer";
// import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware } from "redux";
// import thunk from "redux-thunk";

// const middleware = [thunk];

// const store = configureStore(
//     appReducer, 
//     applyMiddleware(...middleware)
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})