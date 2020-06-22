import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const CustomersList = () => {
  const [apiData, setApiData] = useState([]);
  let letter = '';

  const history = useHistory();

  const handleClick = (prop) => {
    history.push(`/client/${prop}`);
  };
  const handleClickNew = () => {
    history.push(`/add-client`);
  };
  const getData = () => {
    axios
      .get(`http://localhost:8080/customers/all/`, {
        headers: {
          authorization: `${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        const sortedCustomers = response.data.sort(customer => {
          
        })
        setApiData(sortedCustomers);
      });

        

  };
  getData();

  return (
    <div className="client_list">
      <h5 className="clients_title">List of Clients</h5>
      {apiData.map((contact, index) => {
        if (contact.customer[0] !== letter) {
          letter = contact.customer[0];

          return (
            <div  key={index}>
              <h6 id="letter">{letter.toUpperCase()}</h6>
              <p id="list" onClick={handleClick.bind(this, `${contact._id}`)}>
                {contact.customer.toUpperCase()}
              </p>
            </div>
          );
        }
      })}
      <div>
        <button  className="btn btn-secondary button" onClick={handleClickNew}>
          Add new client
        </button>{' '}
      </div>
    </div>
  );
};

export default CustomersList;
