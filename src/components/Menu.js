import React from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Nav, Navbar, Form } from 'react-bootstrap';

const Menu = (props) => {
  const {
    signOut,
  } = props;
  const history = useHistory();

const redirect = () => {
  signOut();
  history.push("/");
}

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
            <Button variant="outline-light" onClick={redirect}>Sign Out</Button>
        </Form>
        </Navbar>
    </div>
  );
};

export default Menu;