import React from 'react';
import { AppContextProvider } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Map from './components/Map';
import Contacts from './components/Contacts';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Route exact path="/">
          <Calendar />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        <Route exact path="/map">
          <Map />
        </Route>
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
