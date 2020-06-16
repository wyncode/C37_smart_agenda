import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Login from '../components/Login';

const LoginPage = () => {
  useContext(AppContext);

  return (
    <div>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
