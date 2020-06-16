import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Signup = () => {
  const { setUser, setLoggedIn } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const signUp = async (email, password, username, e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: `http://localhost:8080/companies`,
      data: {
        username,
        password,
        email
      }
    })
      .then(({ data }) => {
        console.log(data, 'response');
        setUser(data.user);
        setLoggedIn(true);
        setEmail('');
        setPassword('');
        setUsername('');
        localStorage.setItem('token', data.token);
      })
      .catch((e) => console.log(e.message.toString()));
  };

  return (
    <div>
      <form onSubmit={(e) => signUp(email, password, username, e)}>
        <h1>Create Account</h1>
        <div className="form-group">
          <label htmlFor="name">Name </label>
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
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
