import React from 'react';
import { AppContextProvider } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Map from './components/Map';
import Contacts from './components/Contacts';
import Menu from './components/Menu';
import ProfilePage from './pages/ProfilePage';

import './App.css';
import AppConfirmationPage from './pages/AppConfirmationPage';

const App = () => {
  return (

    <BrowserRouter>
     <Menu />
      <AppContextProvider>
        <Route exact path="/companies/me">
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
        <Route path="/confirmation/:id/">
          <AppConfirmationPage /> 
        </Route>
        <Route path="/ProfilePage">
          <ProfilePage />
        </Route>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
