export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const logIn = user => dispatch => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user
    })
}

export const logOut = user => dispatch => {
    dispatch({
        type: LOGOUT
    })
}