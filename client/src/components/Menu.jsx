import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { useHistory } from 'react-router-dom';
import  {Link } from 'react-router-dom'

export default function Menu() {
  
  const history = useHistory();

  const Logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
    window.location.reload();
  };

  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark" className="navbar-custom">
        <Navbar.Brand href="/companies/me">S M A R T A G E N D A</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/clients">clients</Nav.Link>
            <Nav.Item><Link to="/ProfilePage">your profile</Link></Nav.Item>
            <Nav.Link href="#pricing">settings</Nav.Link>
            <Nav.Link href="#pricing">help and feedback</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" onClick={Logout}>
              sign out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
