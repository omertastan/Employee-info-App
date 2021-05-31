import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { logout } from '../actions/userAction';

const Header = () => {
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    dispatch(logout());
  };
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <i className="fas fa-address-card"> </i> Bank Employees Informations
          </Navbar.Brand>

          <Nav className="ml-auto">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <LinkContainer to="/employees">
                <Nav.Link>
                  <i className="far fa-id-badge mx-1"></i>
                  Employees
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="far fa-id-badge mx-1"></i>
                  {userInfo ? userInfo.name : 'Login'}
                </Nav.Link>
              </LinkContainer>
              <Button type="button" onClick={logoutHandler}>
                Logout
              </Button>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
