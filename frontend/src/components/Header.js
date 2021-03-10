import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';

export const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userAuth } = userLogin;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Kalória Követő</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {userAuth ? (
              <>
                <LinkContainer to='/profile'>
                  <Nav.Link>Profil</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/intake'>
                  <Nav.Link>Napi bevitel</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/intake/add'>
                  <Nav.Link>Hozzáadás</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/statistics'>
                  <Nav.Link>Statisztikák</Nav.Link>
                </LinkContainer>

                <Button className='p-2' size='sm' onClick={handleLogout}>
                  Kijelentkezés
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to='/login'>
                  <Nav.Link>Bejelentkezés</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Nav.Link>Regisztráció</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
