import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import axios from 'axios';
import {Alert} from 'antd'

import {SERVER_API_URL} from '../../../requests';
import {GET_ALL_USER_POST} from '../../../requests/blog'
import Articles from './articles'
import PageLoading from '../pageLoading'


export class UserPost extends Component {
    constructor(props){
        super(props)

        this.state = {
            post: {
                edges: []
            },
            done: false
        }

        // variables
        this.username = this.props.match.params.username

        // functions
        this.fetchData = this.fetchData.bind(this)
    }
    
    componentDidMount() {
        this.fetchData()
    }
    
    componentWillUnmount() {
        this.setState({
            post: [],
            done: false
        })
    }
        
    fetchData = ()=>{
        axios.post(SERVER_API_URL,GET_ALL_USER_POST(this.username))
        .then(result =>{
            let response = []
            if(result.data.data.allUsers.edges.length>0){
                response = result.data.data.allUsers.edges[0].node.posts
            }
    
            this.setState({
                post: response,
                done: true
            })
        })
        .catch(error => console.error(error))
    };


    render() {
        return (
            <div className='container mt-3 pt-3'>
                {
                    this.state.done ?
                    <>
                    {
                    this.state.post.edges ?
                        <>
                         <h5> Publicações de 
                        <Link to={`/user/${this.username}`} className='pl-1' style={{color: '#262626'}}> 
                                {this.username}
                            </Link>
                        </h5>                    
                        <Articles userRedirection='/user/' data={this.state.post.edges} />
                        </>
                    :
                    <Alert type="error" message='Usuário não encontrado' showIcon />

                }
                </>
                    :
                    <PageLoading />

                }
            </div>                
        )
    }
}

export default UserPost
