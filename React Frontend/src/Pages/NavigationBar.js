import React from 'react';
import { Navbar, Nav, } from 'react-bootstrap'
import image from '../Pictures/logo.png';
export default function NavigationBar(props){
    const user=localStorage.getItem("userId");
    const jwt=localStorage.getItem("jwtToken");
    const role=localStorage.getItem("role");
    return (
        <>
            <Navbar bg="dark" variant="dark" className=" px-2 py-2" expand="lg">
                {
                    <a class="navbar-brand" href="/">
                    <img src={image} width="50" height="30" class="d-inline-block align-top" alt=""/>
                      E-Bus
                  </a>
                }
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='/viewSchedule'>View Bus Schedule</Nav.Link>
                        <Nav.Link href='/Login'>{props.data}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}