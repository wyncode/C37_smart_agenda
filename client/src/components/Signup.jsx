import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Signup = () => {
  const { setUser, setLoggedIn } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const history = useHistory();

  const signUp = async (email, password, companyName, e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: `http://localhost:8080/companies`,
      data: {
        companyName,
        password,
        email
      }
    })
      .then(({ data }) => {
        console.log(data, 'response');
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setEmail('');
        setPassword('');
        setUsername('');
        localStorage.setItem('token', data.token);
        history.push("/");
        window.alert('Account created succesfully.')
      })
      .catch((e) => window.alert( 'Email or password invalid'));
  };

  return (
    <div>
      <form className="form-group" onSubmit={(e) => signUp(email, password, username, e)}>
        
        <div className="form-group">
          <h4>Create Account</h4>
          <label htmlFor="companyName">Company </label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
