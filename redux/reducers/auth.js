import {
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNOUT_SUCCESS,
    SIGNOUT_ERROR,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR
} from "../actions/type";

const initialState = {
    authMessage: "",
};

export default function(state = initialState, action){
    if(action.type === LOGIN_SUCCESS || action.type === SIGNOUT_SUCCESS){
        return {
            ...state,
            authMessage: ""
        };
    }else if (
        action.type === SIGNUP_SUCCESS ||
        action.type === SIGNUP_ERROR ||
        action.type === LOGIN_ERROR ||
        action.type === SIGNOUT_ERROR ||
        action.type === RESET_PASSWORD_SUCCESS ||
        action.type === RESET_PASSWORD_ERROR
    )   {
            return {
                ...state,
                authMessage: action.payload
            }
        } else {
            return state;
        }
}
