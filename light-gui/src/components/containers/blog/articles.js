import React, {useEffect} from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { List, Avatar } from 'antd';
import { MessageOutlined, StarOutlined } from '@ant-design/icons';

import {SERVER_URL} from '../../../requests';
import {restart} from '../../../store/actions/postActions'


const Articles = props => {
  const maxContentLength = 481
  const userRedirection = props.userRedirection == null ? '/post/user/' : props.userRedirection 
  
  useEffect(()=>{
    if (props.success)
      props.restart()
  },[props])

  const ContentVerification = (item)=> {
    let content = item.content.slice(0,maxContentLength)
    let ler_mais = ''
    
    if(item.content.length > maxContentLength)
        ler_mais = (<Link to={`/post/${item.id}`}> ... ler mais </Link>)

    return (<p>{content} {ler_mais}</p>)
  }

  return (
    <div className='mb-5 mt-2'>
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      // onChange: page => {
      //   console.log(page);
      // },
      pageSize: 4,
    }}

    dataSource={props.data}
    footer={
      <div>
        <b>Light Music</b> blog footer
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.node.id}
        actions={[
          <span className='cursor-pointer' key="list-vertical-star-o">
            <StarOutlined className='pr-1'/> 
            120
          </span>,
          <span className='cursor-pointer' key="list-vertical-message">
            <Link className='no-link-color' to={`/post/${item.node.id}`}><MessageOutlined className='pr-1' />221</Link>
          </span>,
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
            <Link to={`${userRedirection}${item.node.user.username}`}> 
              {item.node.user.username} 
            </Link>
            <p><small style={{color: 'gray'}}>{item.node.user.email} </small></p>
            </>
            }
        />
        <div className='mt-15'>
          <p className='mb-0 pl-1' style={{color: 'gray'}}>{item.node.title}</p>
            {ContentVerification(item.node)}
        </div>
      </List.Item>
    )}
  />
  </div>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.post.success
  }
}
export default connect(mapStateToProps,{restart})(Articles)
