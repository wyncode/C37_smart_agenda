import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Contact = () => {
  const [apiData, setApiData] = useState({});
  let pathArray = window.location.pathname.split('/');
  let id = pathArray[2];
  const history = useHistory();

  const handleClick = (prop, id) => {
    history.push(`/invite/${prop}/${id}`);
  };

  useEffect(() => {
    const getData = async () => {
      axios
        .get(`http://localhost:8080/customers/${id}`, {
          headers: {
            authorization: `${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          setApiData(response.data);
          console.log(response.data);
        });
    };
    getData();
  });

  const customer = apiData.customer;
  const email = apiData.email;
  const phone = apiData.phone;
  return (
    <div>
      <h1>Customer: {customer}</h1>
      <h1>Email: {email}</h1>
      <h1>Phone: {phone}</h1>
      <Button
        variant="outline-primary"
        onClick={handleClick.bind(this, `${email}`, `${id}`)}
      >
        Create Appointment
      </Button>{' '}
    </div>
  );
};

export default Contact;
