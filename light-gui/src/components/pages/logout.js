import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {Button, Space} from 'antd'

import {authLogout} from '../../store/actions/authActions'

const Logout = props =>{
    return(
        <div className='container'>
            {
                !props.isAuthenticated ?
                    <Redirect to='/'/>
                :
                <>
                    <h1 className='mt-5'>Desejas terminar sessão?</h1>
                    <Space>
                        <Button type='danger' onClick={()=> props.authLogout()}>Sim</Button>
                        <Button type='primary' onClick={()=> window.history.back()}>Não</Button>
                    </Space>
                </>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{authLogout})(Logout)
