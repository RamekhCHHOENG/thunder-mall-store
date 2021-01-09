import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';

class SideBar extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">WEBTEMPLATE</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Ecommerce</Nav.Link>
        <Nav.Link href="#features">Framework</Nav.Link>
        <Nav.Link href="#pricing">Inspiration</Nav.Link>
        <Nav.Link href="#pricing">Promotion</Nav.Link>
      </Nav>
      <img class="rounded-circle" width="40" alt="10x10" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"></img>
      </Navbar>
    );
  }
}
 
export default SideBar;