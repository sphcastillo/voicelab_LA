import { BEGIN_API_CALL, API_CALL_ERROR } from "../actions/type";

const initialState = {
    apiCallsInProgress: 0
};

function actionTypeEndsInSuccess(type){
    return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(state = initialState, action){
    if(action.type === BEGIN_API_CALL){
        return {...state, apiCallsInProgress: 1};
    } else if(action.type === API_CALL_ERROR){
        return {...state, apiCallsInProgress: 0};
    } else if(actionTypeEndsInSuccess(action.type)){
        return {...state, apiCallsInProgress: 0};
    } else {
        return state;
    }
}