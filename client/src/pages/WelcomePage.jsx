import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Signup from '../components/Signup';

const WelcomePage = () => {
  useContext(AppContext);

  return (
    <div>
      <div>
        <Welcome />
      </div>
    </div>
  );
};

export default WelcomePage;
