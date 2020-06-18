import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePick from '../components/DatePick';
import axios from 'axios';
import moment from 'moment';
import TimePick from './TimePick';

const DateSelect = () => {
  const [apiData, setApiData] = useState({});

  let { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      axios.get(`http://localhost:8080/appointments/${id}`).then((response) => {
        setApiData(response.data.appointment);
        console.log(response.data);
      });
    };
    getData();
  }, [id]);

  //add dynamic change
  const owner = apiData.owner;
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
