import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Signup from '../components/Signup';

const SignupPage = () => {
  useContext(AppContext);

  return (
    <div>
      <div>
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
