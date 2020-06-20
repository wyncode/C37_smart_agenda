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
        setApiData(response.data.sort());
      });
  };
  getData();

  return (
    <div>
      <h1>Clients:</h1>
      {apiData.map((contact) => {
        if (contact.customer[0] !== letter) {
          letter = contact.customer[0];

          return (
            <div>
              <p>{letter}</p>
              <p onClick={handleClick.bind(this, `${contact._id}`)}>
                {contact.customer}
              </p>
            </div>
          );
        }
      })}
      <Button variant="outline-primary" onClick={handleClickNew}>
        +
      </Button>{' '}
    </div>
  );
};

export default CustomersList;
