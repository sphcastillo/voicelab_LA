import { LOGIN_SUCCESS, LOGOUT } from "./actions/type";


export default function appReducer(state = initialState, action ){

    const {type, payload} = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: payload.user,
                isLoggedIn: true
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
    }
}