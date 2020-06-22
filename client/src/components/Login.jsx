import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import hourglass from '../images/hourglass.svg';
import Menu2 from './Menu2';

const Login = () => {
  const { setUser, setLoggedIn } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const logIn = async (email, password, e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: `http://localhost:8080/companies/login`,
      data: {
        email: email,
        password: password
      }
    })
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setEmail('');
        setPassword('');
        history.push('/companies/me');
      })
      .catch((e) => window.alert('Crendentials error'));
  };

  return (
    <>
      <Menu2 />
      <br />
      <div className="image-message">
        <img id="image" alt="Hourglass" src={hourglass} />
        <h5>
          Smart Agenda. Smartest way to schedule appointments with clients.{' '}
        </h5>
      </div>
      <br />
      <form className="form-group" onSubmit={(e) => logIn(email, password, e)}>
        <h4>Welcome Back!</h4>
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Log In
        </button>
      </form>
      <div className="form-group">
        <a className="create-account" href="/signup">
          Create an Account
        </a>
      </div>
    </>
  );
};

export default Login;
