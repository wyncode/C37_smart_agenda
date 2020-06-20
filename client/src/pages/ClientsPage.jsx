import React from 'react';
import { Router, Route } from 'react-router-dom';
import CreateCustomer from '../components/CreateCustomer';
import CustomersList from '../components/CustomersList';
import Contact from '../components/Contact';

const ClientsPage = () => {
  return (
    <>
      <CustomersList />
      <Route exact path="/client/">
        <Contact />
      </Route>
    </>
  );
};

export default ClientsPage;
