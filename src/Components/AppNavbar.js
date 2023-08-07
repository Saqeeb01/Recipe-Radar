import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AppNavbar.css'; // Import your custom CSS file

const ContentContainer = ({ children }) => {
  return (
    <Container style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      {children}
    </Container>
  );
};

const AppNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Link to="/" className="navbar-brand">
            Recipe Radar
          </Link>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              {/* <Link to="/" className="nav-link">Home</Link> */}
              <Link to="/favorites" className="nav-link">Favorites</Link>
              {/* <Link to="/recipe-radar" className="nav-link">Recipe Radar</Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ContentContainer />
    </div>
  );
};

export default AppNavbar;
