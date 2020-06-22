import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import '../css/contact.css';
import Menu from './Menu';

const Contact = () => {
  const [apiData, setApiData] = useState({});
  let pathArray = window.location.pathname.split('/');
  let id = pathArray[2];
  const history = useHistory();

  const handleClick = (prop, id) => {
    history.push(`/invite/${prop}/${id}`);
  };

  const backClick = () => {
    history.push(`/clients`);
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
  const address = apiData.address;
  return (
    <>
      <Menu />
      <h3 className="back" onClick={backClick.bind()}>
        Back
      </h3>
      <div className="contact">
        <h1 style={{ color: '#5e8187' }}>Client Info:</h1>
        <h4 className="heading">Name</h4>
        <h1 style={{ color: '#5e8187' }}>{customer}</h1>
        <h4 className="heading">Email</h4>
        <h1 style={{ color: '#5e8187' }}>{email}</h1>
        <h4 className="heading">Phone</h4>
        <h1 style={{ color: '#5e8187' }}>{phone}</h1>
        <h4 className="heading">Address</h4>
        <h1 style={{ color: '#5e8187' }}>{address}</h1>
        <Button
          className="button"
          variant="outline-primary"
          onClick={handleClick.bind(this, `${email}`, `${id}`)}
        >
          Create Appointment
        </Button>{' '}
      </div>
    </>
  );
};

export default Contact;
