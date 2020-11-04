import * as actionTypes from '../types/authTypes'
import {updateObject} from '../utility'


const initialState = {
    token: null,
    user: null,
    error: null,
    loading: false,
    isAuthenticated: false
}

const authStart = (state, action) => {
    return updateObject(state,{
        error: null,
        loading: true,
    })
}

const authSucces = (state, action) => {
    return updateObject(state,{
        token: action.token,
        user: action.user,
        error: null,
        loading: false,
        isAuthenticated: true
    })
}

const authFail = (state, action) => {
    return updateObject(state,{
        error: action.error,
        loading: false,
    })
}

const authLogout = (state, action) => {
    return updateObject(state,{
        token: null,
        isAuthenticated: false
    })
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSucces(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        default: 
            return state;
    }
}

export default reducer;