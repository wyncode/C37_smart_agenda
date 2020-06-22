import React, { useContext } from 'react';
import { AppContextProvider } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
// import Map from './components/Map';
import Contacts from './components/CustomersList';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import AppConfirmationPage from './pages/AppConfirmationPage';
import AppInvitePage from './pages/AppInvitePage';
import ClientsPage from './pages/ClientsPage';
import Contact from './components/Contact';
import CreateCustomer from './components/CreateCustomer';
import InviteSuccessPage from './pages/InviteSuccessPage';
import ConfirmationSuccessfulPage from './pages/ConfirmationSuccessfulPage';

const App = () => {
  const loggedIn = useContext(AppContextProvider);
  return (
    <BrowserRouter>
      <AppContextProvider>
      <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/companies/me">  
          <Calendar />  
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        {/* <Route exact path="/map">
          <Map />
        </Route> */}
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/invite">
          <AppInvitePage />
        </Route>
        <Route path="/clients">
          <ClientsPage />
        </Route>
        <Route exact path="/client/:id">
          <Contact />
        </Route>
        <Route exact path="/add-client">
          <CreateCustomer />
        </Route>
        <Route exact path="/invite-successful/:id">
          <InviteSuccessPage />
        </Route>
        <Route path="/ProfilePage">
          <ProfilePage />
        </Route>
      </AppContextProvider>
      <Route path="/confirmation/:id/">
        <AppConfirmationPage />
      </Route>
      <Route path="/confirmation-successful/:id">
        <ConfirmationSuccessfulPage />
      </Route>
    </BrowserRouter>
  );
};

export default App;
