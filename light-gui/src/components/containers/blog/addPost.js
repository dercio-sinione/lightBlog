import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import { Form, Input, Button, Spin, Alert} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import {JWT_HEADER} from '../../../store/utility'
import {SERVER_API_URL, TOKEN} from '../../../requests'
import {QUERY_ADD_POST} from '../../../requests/blog'

const antIcon = <LoadingOutlined  style={{fontSize: 24}}/>

const FormPost = props => {
    const [erro, setErro] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [newId, setNewId] = useState(null)

    const addPost = (title,content)=>{
        setLoading(true)
        
        axios.post(SERVER_API_URL,QUERY_ADD_POST(title,content),JWT_HEADER(TOKEN))
        .then(res =>{
             if(!res.data.errors){
                setNewId(res.data.data.post.post.id)
                setSuccess(true)
              }
             else{
                console.log(res.data.errors[0])
                setErro(res.data.errors[0])
             }
         })
         .catch(error => {
             console.log(error)
             setErro(error.message)
            })
        setLoading(false)
    }

    // Submição do formulário
    const onFinish = (values) => {
        console.clear()
        addPost(values.title,values.content)
    }
    
    if(success && !loading){
        return <Redirect to={`/post/${newId}`} />
    }

    return (
        <div className='container'>      
        {
        props.isAuthenticated?
        <>
        <h5>Adicionar Publicação</h5>
        
        {erro ? <Alert type='error' message={erro} closable/> : null }

        <Form
        name="FormPost"
        onFinish={onFinish}
        >
        {/* Titulo */}
        <Form.Item
            name="title"
            label='Título'
            hasFeedback
            className='mb-2'
            rules={[
            {
                max: 50,
                message: 'O tamanho máximo para o titulo é de 50 digitos.'
            },
            ]}
        >
            <Input placeholder="Título"/>
        </Form.Item>

        {/* Descricao */}
        <Form.Item
            name="content"
            label='Descrição'
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Este campo é obrigatório!'
            },
            {
                min: 4,
                message: 'Tens que informar pelo menos 4 dígitos.'
            },
            ]}
        >
            <Input.TextArea placeholder="Descrição"/>
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
                Adicionar
                </Button>
            }
        </Form.Item>

        </Form>
        </>
            :
            <>
                <h5>Publicações</h5>
            </>
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