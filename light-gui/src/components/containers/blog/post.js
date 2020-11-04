import React,{useState,useEffect} from 'react';
import axios from 'axios'

import {Alert} from 'antd';

import Articles from './articles'
import AddPost from './addPost'
import PageLoading from '../pageLoading'
import {SERVER_API_URL} from '../../../requests'
import {GET_ALL_POST} from '../../../requests/blog'


export default function Post() {
    const [post, setPost] = useState([])
    const [Erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
       const fetchPost = ()=>{
       
        setLoading(true)
        axios.post(SERVER_API_URL,GET_ALL_POST())
        .then(res =>{
             if(!res.data.errors){
                 setPost(res.data.data.allPost.edges)
              }
             else{
                console.log(res.data.errors[0])
                setErro(res.data.errors[0])
             }
             setLoading(false)
         })
         .catch(error => {
             console.log(error)
             setErro(error.message)
             setLoading(false)
         })
       }

       fetchPost()
    },[])

    return (
        <>
        {loading ? 
        <PageLoading />
         : 
            <div>
                <AddPost />
                {Erro ? 
                    <Alert type="error" message={Erro} closable/>
                : null}
                    <Articles data={post} />
            </div>
        }            
        </>
    )
}
