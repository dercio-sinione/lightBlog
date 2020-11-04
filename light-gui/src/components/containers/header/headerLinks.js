import React from 'react';
import {
    NavItem,
    NavLink
} from 'reactstrap'

import {Link} from 'react-router-dom'

export default function Links({isAuthenticated}){
    return(
            <>
            <NavItem><NavLink tag={Link} to='/' >Músicas</NavLink></NavItem>
            <NavItem><NavLink tag={Link} to='/post' >Blog</NavLink></NavItem>
            {/* <NavItem><NavLink tag={Link} to='#' >Artistas</NavLink></NavItem>  */}
            {
                isAuthenticated ?
                    <NavItem><NavLink tag={Link} to='/logout'>Sair</NavLink></NavItem>
                    :
                     <NavItem><NavLink tag={Link} to='/login'>Login</NavLink></NavItem>
            }
            </>
    )
}