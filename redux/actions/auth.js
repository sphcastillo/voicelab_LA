import { SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_SUCCESS, LOGIN_ERROR } from "./type";
import { auth } from "../../services/config";

// Signing up with Firebase

export const signupUser = (email, password) => async dispatch => {
    try {
        auth.createUserWithEmailAndPassword(email, password)
            .then(dataBeforeEmail => {
                auth().onAuthStateChanged(function(user){
                    user.sendEmailVerification();
                })
            })
            .then(dataAfterEmail => {
                auth().onAuthStateChanged(function(user){
                    if(user.emailVerified){
                    // Email is verified
                    dispatch({
                        type: SIGNUP_SUCCESS,
                        payload: 
                        "Your account was successfully created! Now you need to verify your email address - please check your inbox."
                        })
                    }else {
                    // Email is not verified
                    dispatch({
                        type: SIGNUP_ERROR,
                        payload:
                        "Something went wrong, we couldn't create your account. Please try again."
                    })
                    }
                })
            })
            .catch(function(error){
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: 
                    "Somwthing went wrong, we couldn't create your account. Please try again."
                })
            })
    } catch (error) {
        dispatch({
            type: SIGNUP_ERROR,
            payload:
            "Something went wrong, we couldn't create your account. Please try again."
        })
    }
    
}

export const loginUser = (email, password, callback) => async dispatch => {
    try {
        auth().signInWithEmailandPassword(email, password)
            .then(() => {
                dispatch({ type: LOGIN_SUCCESS });
                callback();
            })
            .catch(() => {
                dispatch({
                    type:  LOGIN_ERROR,
                    payload: "Invalid login credentials"
                })
            })
    } catch (error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: "Invalid login credentials"
        })
    }
};
