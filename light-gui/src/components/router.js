import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Header from './containers/header/header'
import Home from './pages/home'
import Blog from './pages/blog'
import Login from './pages/login'
import Logout from './pages/logout'
import UserPost from './containers/blog/userPost';
import ArticleDetail from './containers/blog/articleDetail';
import UpdatePost from './containers/blog/updatePost';
import Perfil from './containers/user/perfil';


export default function Roteador(props) {
  return (
    <Router>
      <Switch>
      <Header  isAuthenticated={props.isAuthenticated}>
        <Route path='/' exact component={Home} />
        <Route path='/musicas' exact component={Home} />
        <Route path='/post' exact component={Blog} />
        <Route path='/post/:id' exact component={ArticleDetail} />
        <Route path='/post/:id/update' exact component={UpdatePost} />
        <Route path='/post/user/:username' exact component={UserPost} />
        <Route path='/user/:id' exact component={Perfil} />
        <Route path='/login' exact component={Login} />
        <Route path='/logout' exact component={Logout} />
      </Header>
      </Switch>
    </Router>
  )
}
