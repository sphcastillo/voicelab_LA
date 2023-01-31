import { 
    SIGNUP_SUCCESS, 
    SIGNUP_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_ERROR,
    SIGNOUT_SUCCESS,
    SIGNOUT_ERROR,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR
} from "./type";
import { auth, firebase } from "../../services/config";
import { beginApiCall, apiCallError } from "./apiStatus";

// Signing up with Firebase

export const signupUser = (email, password) => async dispatch => {


    try {
        dispatch(beginApiCall());
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                // Sign up successful
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: "You have successfully signed up"
                })
                console.log("Signup successful")
            }else {
                // Signup failed
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: "ERROR: we're not able to sign you up. Please try again"
                })
                console.log("Signup failed")
            }
        })
    } catch (error){
        dispatch(apiCallError());
        dispatch({
            type: SIGNUP_ERROR,
            payload: "ERROR: we're not able to sign you up. Please try again"
        })
        console.log("Signup error")
    }
}

// Logging in with Firebase

export const loginUser = (email, password) => async dispatch => {

    try {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: "You have successfully logged in"
            })
            console.log("LOGIN_SUCCESS: Login successful")
        })
    }catch(error){
        dispatch({
            type: LOGIN_ERROR,
            payload: "ERROR: we're not able to log you in. Please try again"
        })
        console.log("LOGIN_ERROR: Login error: ", error)
    }
}


// Signing out with Firebase

export const signoutUser = () => async dispatch => {
    console.log("inside signoutUser")

    try {
        firebase.auth().signOut()
        .then(() => {
            dispatch({
                type: SIGNOUT_SUCCESS,
                payload: "You have successfully signed out"
            })
            console.log("SIGNOUT_SUCCESS: Signout successful")
        })
    }catch(error){
        dispatch({
            type: SIGNOUT_ERROR,
            payload: "ERROR: we're not able to sign you out. Please try again"
        })
        console.log("LOGIN_ERROR: there has been a login error", error)
    }
}


export const resetPassword = email => async dispatch => {
    try {
        dispatch(beginApiCall());
        auth().sendPasswordResetEmail(email)
            .then(() => 
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    payload: "Check your inbox: we've sent you a secured reset link by email."
                })
            )
            .catch(() => {
                dispatch(apiCallError());
                dispatch({
                    type: RESET_PASSWORD_ERROR,
                    payload: "ERROR: we're not able to reset your password. Please try again."
                })
            })
    } catch(error){
        dispatch(apiCallError());
        dispatch({
            type: RESET_PASSWORD_ERROR,
            payload: error
        })
    }
};