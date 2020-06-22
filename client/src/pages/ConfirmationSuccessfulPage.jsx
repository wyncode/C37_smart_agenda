import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import confirmed from '../images/confirmed.svg';
import '../css/contact.css';

const ConfirmationSuccessfulPage = () => {
  const [apiData, setApiData] = useState({});
  const [companyName, setCompanyName] = useState([]);

  //using pathArray to set the id variable
  let pathArray = window.location.pathname.split('/');
  let id = pathArray[2];

  //Calling data from appointment and company
  const getData = () => {
    axios.get(`http://localhost:8080/appointments/${id}`).then((response) => {
      setApiData(response.data);
    });
    const owner = apiData.company;
    axios.get(`http://localhost:8080/companies/${owner}`).then((response) => {
      setCompanyName(response.data);
    });
  };
  getData();

  //setting variables from the appointment and company data received
  const date = apiData.date;
  const duration = apiData.duration;
  const company = companyName.companyName;

  return (
    <div className="invSuccess">
      <h1 style={{ fontWeight: 'bold' }}>Confirmed!</h1>
      <p>You are scheduled with {company}</p>
      <hr />
      <h1>{duration} Minute Meeting</h1>
      <p>
        {moment(date).format('LT')}, {moment(date).format('dddd')},{' '}
        {moment(date).format('MMMM Do, YYYY')}
      </p>
      <img className="image" src={confirmed} alt="Logo" />
    </div>
  );
};

export default ConfirmationSuccessfulPage;
