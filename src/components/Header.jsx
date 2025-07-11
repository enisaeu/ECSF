import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import ECSFLogo from '../ecsf-logo-text-white.svg';
import { Book, People, ListTask, Gear, Journals, InfoCircle } from 'react-bootstrap-icons';

const Header = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" expanded={expanded} onToggle={setExpanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
          <img src={ECSFLogo} alt="European Cybersecurity Skills Framework (ECSF)" height="48"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav activeKey={location.pathname} className="ms-auto">
            <Nav.Link as={Link} to="/" eventKey="/" onClick={handleNavClick}>
              <Book/> The Framework
            </Nav.Link>
            <Nav.Link as={Link} to="/profiles" eventKey="/profiles" onClick={handleNavClick}>
              <People/> Profiles
            </Nav.Link>
            <Nav.Link as={Link} to="/tasks" eventKey="/tasks" onClick={handleNavClick}>
              <ListTask/> Tasks
            </Nav.Link>
            <Nav.Link as={Link} to="/skills" eventKey="/skills" onClick={handleNavClick}>
              <Gear/> Skills
            </Nav.Link>
            <Nav.Link as={Link} to="/knowledge" eventKey="/knowledge" onClick={handleNavClick}>
              <Journals/> Knowledge
            </Nav.Link>
            <Nav.Link as={Link} to="/about" eventKey="/about" onClick={handleNavClick}>
              <InfoCircle/> About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
