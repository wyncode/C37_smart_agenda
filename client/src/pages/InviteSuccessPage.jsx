import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/contact.css';
import hourglass from '../images/hourglass.svg';

const InviteSuccessPage = () => {
  const [apiData, setApiData] = useState([]);
  const [customerName, setCustomerName] = useState([]);
  const URL = window.location.protocol + '//' + window.location.host;
  let pathArray = window.location.pathname.split('/');
  let id = pathArray[2];

  useEffect(() => {
    const getData = async () => {
      axios.get(`http://localhost:8080/appointments/${id}`).then((response) => {
        setApiData(response.data);
        console.log(response.data);
      });
    };
    getData();
  });

  const getCustomer = (name) => {
    axios
      .get(`http://localhost:8080/customers/${name}`, {
        headers: {
          authorization: `${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        setCustomerName(response.data.customer);
        console.log(response.data);
      });
    return customerName;
  };

  const customer = apiData.customer;

  return (
    <div className="success">
      <h1>
        You have successfully created an appointment with{' '}
        {getCustomer(`${customer}`)}!
      </h1>
      <p style={{ marginTop: '20px' }}>
        Send the following link to your client:
        <p className="link">
          {URL}/confirmation/{id}
        </p>
      </p>
      <img className="image" src={hourglass} />
    </div>
  );
};

export default InviteSuccessPage;
