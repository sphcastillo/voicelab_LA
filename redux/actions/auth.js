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
    console.log("user password: ", password)
    console.log("user email: ", email)

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

export const loginUser = (email, password, callback) => async dispatch => {
    console.log("inside loginUser")
    try {
        dispatch(beginApiCall());
            auth().signInWithEmailAndPassword(email, password)
            .then(data => {
                if(data.user.emailVerified){
                    console.log("IF", data.user.emailVerified);
                    dispatch({ type: LOGIN_SUCCESS });
                    callback();
                    console.log("LOGIN_SUCCESS: Login successful")
                }else {
                    console.log("SIGNUP_ERROR: Login failed.")
                    dispatch({
                        type: LOGIN_ERROR,
                        payload: "ERROR: we're not able to sign you in. Please try again."
                    })
                }
            })
    } catch(error){
        dispatch(apiCallError());
        dispatch({
            type: LOGIN_ERROR,
            payload: "ERROR: we're not able to sign you in. Please try again."
        })
        console.log("Catch error; login error ")
    }

};


// Signing out with Firebase

export const signoutUser = () => async dispatch => {
    try {
        dispatch(beginApiCall());
        auth().signOut()
            .then(() => {
                dispatch({ type: SIGNOUT_SUCCESS });
            })
            .catch(() => {
                dispatch(apiCallError());
                dispatch({
                    type: SIGNOUT_ERROR,
                    payload: "ERROR: we're not able to sign you out. Please try again."
                })
            })
    } catch (error){
        dispatch(apiCallError());
        dispatch({
            type: SIGNOUT_ERROR,
            payload: "ERROR: we're not able to sign you out. Please try again."
        })
    }
};

// Resetting password with Firebase

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