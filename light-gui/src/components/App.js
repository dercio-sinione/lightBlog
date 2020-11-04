import React, {useEffect} from 'react';
import {connect} from 'react-redux'

import Router from './router'
import {authCheckState} from '../store/actions/authActions';
// import {start} from '../store/actions/postActions';


function App(props) {

  useEffect(()=>{
    props.authCheckState()
    // props.start()
  },[props])
  
  return (
        <Router {...props}/>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

// export default connect(mapStateToProps, {authCheckState,start})(App);
export default connect(mapStateToProps, {authCheckState})(App);
