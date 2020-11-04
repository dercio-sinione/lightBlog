import axios from 'axios'

import * as actionTypes from '../types/authTypes'
import {SERVER_API_URL, LOGIN, VERIFY_TOKEN} from '../../requests'
import { STANDARD_HEADER } from "../utility";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: username
    }
}


export const authFail = error =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());

        axios.post(SERVER_API_URL,LOGIN(username,password),STANDARD_HEADER)
        .then(res =>{
            
            if(!res.data.errors){
                let response = res.data.data.tokenAuth
                console.log("Login..:",res.data.data)
                const token = response.token
                const refreshToken = response.refreshToken
         
                localStorage.setItem('token', token)
                localStorage.setItem('refreshToken', refreshToken)
                dispatch(authSuccess(token));
             }
            else{
                dispatch(authFail(res.data.errors[0]))
            }
        })
        .catch(error => {
            dispatch(authFail(error))
        })
    }
}


export const authCheckState = ()=>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token)
            axios.post(SERVER_API_URL,VERIFY_TOKEN(token),STANDARD_HEADER)
            .then(res =>{
                if(!res.data.errors){
                    dispatch(authSuccess(token,res.data.data.verifyToken.payload.username))
                }
                else{
                    dispatch(authFail(res.data.errors[0]))
                }
            })
            .catch(error => {
                dispatch(authFail(error))
            })
    }
}

export const authLogout = ()=>{
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        console.count('exiting...')
        dispatch({type: actionTypes.AUTH_LOGOUT})
    }
}
