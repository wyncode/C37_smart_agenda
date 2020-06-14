import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Login = () => {
  const { setUser, setLoggedIn, user } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = async (email, password, e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: `${process.env.MONGODB_URL}/companies/login`,
      data: {
        email: email,
        password: password
      }
    })
      .then(({ data }) => {
        console.log(data, 'response');
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setEmail('');
        setPassword('');
      })
      .catch((e) => console.log(e.message.toString(), 'Crendentials error'));
  };

  return (
    <>
      <form onSubmit={(e) => logIn(email, password, e)}>
        <h3>Welcome Back</h3>
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
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
      <div>{user.name}</div>
    </>
  );
};

export default Login;
