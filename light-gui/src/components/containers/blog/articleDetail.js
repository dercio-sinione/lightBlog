import React, {Component} from 'react';
import axios from 'axios';

import {SERVER_API_URL} from '../../../requests';
import {GET_POST} from '../../../requests/blog';

import DetaielContainer from './DetaielContainer'


export class articleDetail extends Component {
    constructor(props){
        super(props)

        this.state = {
            post: [],
            done: false
        }

        // variables
        this.id = this.props.match.params.id

        // functions
        this.fetchData = this.fetchData.bind(this)
    }
    
    componentDidMount() {
        this.fetchData()
    }
    
    fetchData = ()=>{
        axios.post(SERVER_API_URL,GET_POST(this.id))
        .then(result =>{
            this.setState({
                post: [{
                    node: {
                        ...result.data.data.post
                    }
                }],
                done: true
            })
        })
        .catch(error => console.error(error))
    }

    render() {
        return (
            <div className='container mt-2 pt-3'>
                <DetaielContainer data={this.state.post}/>                
            </div>                
        )
    }
}

export default articleDetail