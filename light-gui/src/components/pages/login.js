import React from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {authLogin} from '../../store/actions/authActions'

import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';


const antIcon = <LoadingOutlined  style={{fontSize: 24}}/>

const LoginForm = (props) => {
    const [form] = Form.useForm()
    
    const onFinish = (values) => {
        props.onAuth(values.username, values.password)
    };

    let errorMessage = null

    if(props.error){
        errorMessage = (
            <p>{props.error.message}</p>
        ) 
    }

    return (
        <div className='container mt-5'>
        {
            props.isAuthenticated ?
            <Redirect to='/' />
            :
            null
        }

        {errorMessage}
            <Form
            form = {form}
            name="login_form"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            >
                {/* Username */}
            <Form.Item
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
                {
                    min: 3,
                    max: 20,
                    message: 'Entry a name between 3 and 20 characteres'
                },
                ]}
            >
                <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            {/* Password */}
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                allowClear
                placeholder="Password"
                />
            </Form.Item>
            
                {/* Remember */}
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <NavLink className="login-form-forgot" to='/reset-password'>
                    Forgot password
                </NavLink>
                
            </Form.Item>

            {/* Button Submit */}
            <Form.Item>
                {
                    props.loading ?
                    <Spin indicator={antIcon}/>
                    :
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button">
                    Log in
                    </Button>
                }
                    <span> Or 
                    <NavLink to='/registar' className='ml-1'>
                        register now!
                    </NavLink>
                </span>
            </Form.Item>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, password) => {
            dispatch(authLogin(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)