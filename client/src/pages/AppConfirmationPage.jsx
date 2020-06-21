import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker, { setHours, setMinutes } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppConfirmationPage = () => {
  const [apiData, setApiData] = useState({});
  const [companyName, setCompanyName] = useState([]);
  let pathArray = window.location.pathname.split('/');
  let id = pathArray[2];

  useEffect(() => {
    const getData = async () => {
      axios.get(`http://localhost:8080/appointments/${id}`).then((response) => {
        setApiData(response.data);
      });
    };
    getData();
  });
  const owner = apiData.company;

  useEffect(() => {
    const getCompany = async () => {
      axios.get(`http://localhost:8080/companies/${owner}`).then((response) => {
        setCompanyName(response.data);
      });
    };
    getCompany();
  });

  const company = companyName.companyName;
  const duration = apiData.duration;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const createAppointment = async (date, time, e) => {
    e.preventDefault();
    await axios({
      method: 'PATCH',
      url: `http://localhost:8080/appointments/${id}`,
      data: {
        date,
        time
      },
      headers: {
        authorization: `${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        setDate('');
        setTime('');
      })
      .catch((e) => console.log(e.message.toString()));
  };

  return (
    <>
      <div>
        <h1>{company}</h1>
        <h3>Invites You To A {duration} Minute Meeting!</h3>
        <form onSubmit={(e) => createAppointment(date, time, e)}>
          <p>Select a day</p>
          <DatePicker
            selected={date}
            minDate={moment().toDate()}
            onChange={(startDate) => setDate(startDate)}
            inline
          />
          <p>{moment(date).format('dddd')}</p>
          <p>{moment(date).format('MMMM Do, YYYY')}</p>
          <p>Select a Time</p>
          <DatePicker
            selected={time}
            onChange={(startTime) => setTime(startTime)}
            showTimeSelect
            showTimeSelectOnly
            minTime={setHours(setMinutes(new Date(), 0), 9)}
            maxTime={setHours(setMinutes(new Date(), 0), 17)}
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            inline
          />
          <p>{moment(time).format('LT')}</p>
          <p>Duration: {duration} Minutes</p>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default AppConfirmationPage;
