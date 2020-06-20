import React, { useEffect, useState } from 'react';
import DatePick from '../components/DatePick';
import axios from 'axios';
import moment from 'moment';
import TimePick from './TimePick';

const DateSelect = () => {
  const [apiData, setApiData] = useState({});
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

  // const getOwner = (name) => {
  //   axios
  //     .get(`http://localhost:8080/customers/${owner}`, {
  //       headers: {
  //         authorization: `${localStorage.getItem('token')}`
  //       }
  //     })
  //     .then((response) => {
  //       setCustomerName(response.data.company);
  //       console.log(response.data);
  //     });
  //   return customerName;
  // };

  //add dynamic change
  const owner = apiData.company;
  const duration = apiData.duration;
  const date = apiData.date;

  return (
    <>
      <div>
        <h1>{owner}</h1>
        <h3>invites you to a {duration} minute meeting</h3>
        <p>Select a day</p>
        <DatePick />
        <p>{moment(date).format('dddd')}</p>
        <p>{moment(date).format('MMMM Do, YYYY')}</p>
        <p>Select a Time</p>
        <p>Duration: {duration} Minutes</p>
        <TimePick />
      </div>
    </>
  );
};

export default DateSelect;
