import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import { Form, Input, Button, Spin, message} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import {JWT_HEADER} from '../../../store/utility'
import {SERVER_API_URL, TOKEN} from '../../../requests'
import {QUERY_UPDATE_POST} from '../../../requests/blog'

const antIcon = <LoadingOutlined  style={{fontSize: 24}}/>

const FormPost = ({isAuthenticated, location}) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const data = location.state

    const UpdatePost = (id,title,content)=>{
        setLoading(true)
        
        axios.post(SERVER_API_URL,QUERY_UPDATE_POST(id,title,content),JWT_HEADER(TOKEN))
        .then(res =>{
             if(!res.data.errors){
                setSuccess(true)
              }
             else{
                // console.log(res.data.errors[0])
                message.error({
                    content:res.data.errors[0].message,
                },4)
             }
         })
         .catch(error => {
            //  console.log(error)
             message.error({
                content: error[0].message,
            },6)
            })

        setLoading(false)
    }

    // Submição do formulário
    const onFinish = (values) => {
        console.clear()
        UpdatePost(data.id,values.title,values.content)
    }
    
    if(success && !loading){
        setTimeout(()=>{
            message.success('Post actualizado com sucesso.',4)
          },0)
        return <Redirect to={`/post/${data.id}`} />
    }

    return (
        <div className='container mt-5'>      
        {
            isAuthenticated?
            <>
            <h5>Actualizar Publicação</h5>
        
            {/* {erro ? <Alert type='error' message={erro} closable style={{margin:'8px'}}/> : null } */}

            <Form name="FormPost" onFinish={onFinish} >
           
            {/* Titulo */}
            <Form.Item
                name="title"
                label='Titulo'
                hasFeedback
                help="This field isn't required."
                rules={[
                {
                    max: 50,
                    message: 'The max lenght for this post is 50 characters.'
                },
                ]}
                initialValue={data.title}
            >
                <Input placeholder="Titulo"/>
            </Form.Item>

            {/* Descricao */}
            <Form.Item
                name="content"
                label='Description'
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'This field is required!'
                },
                {
                    min: 4,
                    message: 'You must provid at least 4 characters for this post.'
                },
                ]}
                initialValue={data.content}
            >
                <Input.TextArea placeholder="Description"/>
            </Form.Item>

            {/* Button Submit */}
            <Form.Item>
                {
                    loading ?
                    <Spin indicator={antIcon}/>
                    :
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                    >
                    Actualizar
                    </Button>
                }
            </Form.Item>

            </Form>
                            
            </>
                :
                null
        }
        </div>
            
    );
};


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps,null)(FormPost)