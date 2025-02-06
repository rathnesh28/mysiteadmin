import React, { useState } from 'react';
import styles from '../styles/Header.module.css';
import { FaBars, FaBell, FaCog, FaUserCircle } from 'react-icons/fa';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';

const Header = ({ isSidebarCollapsed, toggleSidebar }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      className={`${styles.navbar} ${isSidebarCollapsed ? styles.navbarCollapsed : ''} `}
      fixed="top"
    >
      <Container fluid>
        {/* Navbar Brand or Logo */}
        <Navbar.Brand href="/" className={`${styles.brand} mx-auto mx-lg-0`}>
          {/* Logo */}
          <div className={`${styles.logo} ${isSidebarCollapsed ? styles.logoCollapsed : ''}`}>
            <img src="/logo.png" alt="Logo" />
          </div>
        </Navbar.Brand>

        {/* Sidebar Toggle Button */}
        <span
          className={`${styles.toggleButton} d-none d-lg-block d-flex`}
          onClick={toggleSidebar}
        >
          <FaBars className={`${styles.toggleIcon} ${isSidebarCollapsed ? styles.toggleIconCollapsed : ''}`} />
        </span>

        {/* Navbar Toggler for Mobile */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          className={styles.navbarToggler}
          onClick={handleToggle}
        >
          <FaBars />
        </Navbar.Toggle>

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto" onClick={handleClose}>
            <Nav.Link href="#" className={styles.navIcon}>
              <FaBell />
            </Nav.Link>
            <Nav.Link href="#" className={styles.navIcon}>
              <FaCog />
            </Nav.Link>
            <Nav.Link href="#" className={styles.navIcon}>
              <FaUserCircle />
            </Nav.Link>
          </Nav>

          {/* Mobile Search Bar */}
          <Form className={`d-flex d-lg-none ${styles.mobileSearchForm}`}>
            <FormControl
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
