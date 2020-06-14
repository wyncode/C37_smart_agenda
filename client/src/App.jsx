import React from 'react';
import { AppContextProvider } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
