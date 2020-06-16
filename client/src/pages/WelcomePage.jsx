import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Signup from '../components/Signup';

const WelcomePage = () => {
  useContext(AppContext);

  return (
    <div>
      <div>
        <h1>Smaprt Agenda</h1>
        <button></button>
      </div>
    </div>
  );
};

export default WelcomePage;
