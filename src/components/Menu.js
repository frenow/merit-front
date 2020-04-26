import React from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Nav, Navbar, Form } from 'react-bootstrap';
import { IoLogoBitcoin } from "react-icons/io";
import { GoSignOut } from "react-icons/go";

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
        <Navbar.Brand href="#"><IoLogoBitcoin />Merit</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/">Profile</Nav.Link>
            <Nav.Link as={NavLink} to="/Balance">Saldo</Nav.Link>
            <Nav.Link as={NavLink} to="/Withdrawal">Retirada</Nav.Link>
            <Nav.Link as={NavLink} to="/Deposit">Depósito</Nav.Link>
            <Nav.Link as={NavLink} to="/Reward">Resgate</Nav.Link>
            <Nav.Link as={NavLink} to="/About">Sobre</Nav.Link>
        </Nav>
        <Form inline>
            <Button variant="outline-light" onClick={redirect}><GoSignOut />Sign Out</Button>
        </Form>
        </Navbar>
    </div>
  );
};

export default Menu;