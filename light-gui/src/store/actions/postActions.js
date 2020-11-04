import axios from 'axios'

import {POST_START, POST_RESTART, POST_FAIL, POST_ADD,POST_DELETE, FETCH_POST} from '../types/postTypes'
import {SERVER_API_URL} from '../../requests'
import {GET_ALL_POST, QUERY_ADD_POST, DELETE_POST} from '../../requests/blog'

import {JWT_HEADER} from '../utility'


export const start = ()=> {
    return {
        type: POST_START
    }
}

export const restart = ()=> {
    return {
        type: POST_RESTART
    }
}

export const getPost = post => {
    return {
        type: FETCH_POST,
        post: post
    }
}

export const createPost = post => {
    return {
        type: POST_ADD,
        post: post
    }
}

export const fail = error => {
    return {
        type: POST_FAIL,
        error: error
    }
}
  
export const add_post = (title, content) =>{
    return dispatch =>{
        dispatch(start())

        const token = localStorage.getItem('token')

        axios.post(SERVER_API_URL,QUERY_ADD_POST(title,content),JWT_HEADER(token))
        .then(res =>{
            console.log("Data: ",res.data.data.post)
            if(!res.data.errors){
                dispatch(createPost(res.data.data.post))
             }
            else{
                dispatch(fail(res.data.errors[0]))
            }
            
        })
        .catch(error => {
            dispatch(fail(error))
        })
    }
}

export const deletePost = (id) =>{
    return dispatch =>{
        dispatch(start())

       const token = localStorage.getItem('token')

       axios.post(SERVER_API_URL,DELETE_POST(id),JWT_HEADER(token))
       .then(res =>{
            if(!res.data.errors){

                dispatch({type: POST_DELETE})

             }
            else{
                dispatch(fail(res.data.errors[0]))
            }
            
        })
        .catch(error => {
            dispatch(fail(error))
        })
    }
}

export const fetchData = () =>{
    return dispatch =>{
        dispatch(start())

       axios.post(SERVER_API_URL,GET_ALL_POST())
       .then(res =>{
           
            if(!res.data.errors){
                dispatch(getPost(res.data.data.allPost))
             }
            else{
                dispatch(fail(res.data.errors[0]))
            }

        })
        .catch(error => {
            dispatch(fail(error))
        })
    }
}
