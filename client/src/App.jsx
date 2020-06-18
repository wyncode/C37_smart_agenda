import React from 'react';
import { AppContextProvider } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Menu from './components/Menu';

import './App.css';

const App = () => {
  return (

    <BrowserRouter>
     <Menu />
      <AppContextProvider>
        <Route exact path='/'>
          <Calendar />
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
