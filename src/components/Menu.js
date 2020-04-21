import React from "react";
import { NavLink } from 'react-router-dom';
import { Button, Nav, Navbar, Form } from 'react-bootstrap';

const Menu = (props) => {
  const {
    signOut,
  } = props;
  return (
    <div>
        <Navbar bg="primary" variant="dark" fixed="top">
        <Navbar.Brand href="/">Merit</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/">Profile</Nav.Link>
            <Nav.Link as={NavLink} to="/Saldo">Saldo</Nav.Link>
            <Nav.Link as={NavLink} to="/Sobre">Sobre</Nav.Link>
        </Nav>
        <Form inline>
            <Button variant="outline-light" onClick={signOut}>Sign Out</Button>
        </Form>
        </Navbar>
    </div>
  );
};

export default Menu;