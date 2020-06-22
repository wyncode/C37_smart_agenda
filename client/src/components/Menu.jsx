import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { useHistory } from 'react-router-dom';

import axios from "axios"
import  { Link } from 'react-router-dom'
import { AppContext, AppContextProvider } from '../context/AppContext';

export default function Menu() {
  const history = useHistory();

  const Logout = async () => {
    const token = localStorage.getItem("token")
    await axios({
      method: "POST",
      url: `/companies/logout`,
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(({data}) =>{
    localStorage.removeItem('token');
    history.push('/login');
    window.location.reload();
  })
  .catch(e => console.log(e.message.toString()))
}

  // const { setUser, setLoggedIn } = useContext(AppContext);
  const { user, setUser } = useContext(AppContext);
  const { loggedIn, setLoggedIn } = useContext(AppContext);

  
  const signedIn =
      <div>
      <Navbar expand="lg" bg="dark" variant="dark" className="navbar-custom">
        <Navbar.Brand href="/">S M A R T A G E N D A</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/clients">clients</Nav.Link>
            <Nav.Item>
              <Link to="/ProfilePage">your profile</Link>
            </Nav.Item>
            <Nav.Link href="#pricing">settings</Nav.Link>
            <Nav.Link href="#pricing">help and feedback</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" onClick={Logout}>
              Sign out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>


  const signedOut = 
      <div>
      <Navbar expand="lg" bg="dark" variant="dark" className="navbar-custom">
        <Navbar.Brand href="/companies/me">S M A R T A G E N D A</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/clients">clients</Nav.Link>
            <Nav.Link href="/ProfilePage">your profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/signup">
              sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>

  return (
    <>
    {loggedIn ? signedIn : signedOut}
    </>
  );
}