
import {POST_START, POST_RESTART, POST_FAIL, FETCH_POST, POST_ADD, POST_DELETE} from '../types/postTypes'
import {updateObject} from '../utility'

export const initialState = {
    data: [],
    newItem: [], 
    error: null,
    loading: false,
    success: false
}


const start = (state, action) => {
    return updateObject(state,{
        newItem: [], 
        loading: true,
        success: false,
        error: null,
    })
}

const restart = (state, action) => {
    return updateObject(state,{
        newItem: [], 
        loading: false,
        success: false,
        error: null,
    })
}

const delelePost = (state, action) => {
    return updateObject(state,{
        loading: false,
        success: true,
    })
}

const addPost = (state, action) => {
    console.log('New:', action.post.post)
    return updateObject(state,{
        newItem: action.post.post,
        loading: false,
        success: true,
    })
}


export const fetchPost = (state, action) => {
    return updateObject(state,{
        data: action.post,
        loading: false,
    })
}

const fail = (state, action) => {
    return updateObject(state,{
        error: action.error,
        loading: false,
        success: false,
    })
}


const reducer = (state=initialState, action) =>{
    switch (action.type) {
        case POST_START: return start(state, action)  
        case POST_RESTART: return restart(state, action)  
        case FETCH_POST: return fetchPost(state, action)  
        case POST_ADD: return addPost(state, action)  
        case POST_DELETE: return delelePost(state, action)  
        case POST_FAIL: return fail(state, action)  
        default:
            return state
    }
}

export default reducer