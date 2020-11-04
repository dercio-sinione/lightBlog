import React, {useState} from 'react';
import {
    Nav,
    Navbar,
    Collapse,
    NavbarBrand,
    NavbarToggler
} from 'reactstrap'
import {Link} from 'react-router-dom'
import NavItems from './headerLinks'

export default function Header(props){
    const [open, setOpen] = useState(false)
    const toggle = () =>{
        setOpen(!open)
    }
    return(
        <div>
            {/* <Navbar color='dark' className='fixed-top float' dark expand='md'> */}
            <Navbar color='dark' className='float' dark expand='md'>
                <NavbarBrand tag={Link} to='/' onClick={toggle}>LightMusic</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={open} navbar>
                    <Nav className='ml-auto' navbar>
                        <NavItems toggle={toggle} isAuthenticated={props.isAuthenticated}/>
                    </Nav>
                </Collapse>
            </Navbar>

            <div>
                {props.children}
            </div>
        </div>
    )
}