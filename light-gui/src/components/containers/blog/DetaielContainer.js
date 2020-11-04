import React from "react";
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

import { List, Avatar, Button, message } from 'antd';
import { MessageOutlined, StarOutlined } from '@ant-design/icons';

import {SERVER_URL} from '../../../requests';
import {deletePost} from '../../../store/actions/postActions'


const DetaielContainer = props => {  
  const history = useHistory()
  
  const RemovePost = (id)=>{
    props.deletePost(id)
  }

  if(props.success){
    setTimeout(()=>{
      message.success('Post eliminado com sucesso',4)
    },0)

    history.goBack()
  }
  else if(props.error && !props.success){
    setTimeout(()=>{
        message.error(props.error.message,4)
      },0)
  }
  
  return (
    
    <div className='mb-5'>

    <List
    itemLayout="vertical"
    size="large"
    
    dataSource={props.data}
    footer={
      <div>
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.node.id}
        actions={[
          <div className='info-detail'>
          <span className='cursor-pointer' key="list-vertical-star-o">
            <StarOutlined className=''/> 
            120
          </span>
          <span key="list-vertical-message" className='ml-3 mr-2'>
            <MessageOutlined />
            221
          </span>
          
          {
            props.user === item.node.user.username ?
            <>
            <div className='ml-2 mr-1'>
          <Link to={{
              pathname: `/post/${item.node.id}/update`,
              state:{
                id: item.node.id,
                title: item.node.title,
                content: item.node.content,
              }}
            }> 
              <Button type='primary' shape='round' className=''>
                Editar
              </Button>
            </Link>
          </div>

          <div className=''>
          <Button type='danger' shape='round' onClick={()=>RemovePost(item.node.id)}>Eliminar</Button>
          </div>
          
            </>
            :
            null
          }
          </div>
        ]}
        extra={
          item.node.pictureUrl !== null ?
            <img
              className='borderImg'
              width={200}
              height={200}
              alt="logo"
              src={SERVER_URL + item.node.pictureUrl}
          />
          :
          null
        }
      >
        <List.Item.Meta 
          avatar={<Avatar src={SERVER_URL + item.node.user.avatarUrl} />}
          title={
            <>
            <Link to={{
              pathname: `/post/user/${item.node.user.username}`,
              state:{
                id: item.node.user.id
              }}
            }> 
              {item.node.user.username} 
            </Link>
            <p><small style={{color: 'gray'}}>{item.node.user.email} </small></p>
            </>
            }
        />
        <div className='mt-15'>
          <p className='mb-0 pl-1' style={{color: 'gray'}}>{item.node.title}</p>
            {item.node.content}
        </div>
      </List.Item>
    )}
  />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.post.error,
    loading: state.post.loading,
    success: state.post.success,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps,{deletePost})(DetaielContainer)