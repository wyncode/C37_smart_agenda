import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import DatePicker, { setHours, setMinutes } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppConfirmationPage = () => {
  const [apiData, setApiData] = useState({});
  const [companyName, setCompanyName] = useState([]);

  //using pathArray to set the id variable
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
  const history = useHistory();
  const [date, setDate] = useState(new Date());

  const createAppointment = async (date, e) => {
    e.preventDefault();
    await axios({
      method: 'PATCH',
      url: `http://localhost:8080/appointments/${id}`,
      data: {
        date
      },
      headers: {
        authorization: `${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        setDate(``);
      })
      .catch((e) => console.log(e.message.toString()));
    history.push(`/confirmation-successful/${id}`);
  };

  return (
    <>
      <div>
        <h1>{company}</h1>
        <h3>Invites You To A {duration} Minute Meeting!</h3>
        <form onSubmit={(e) => createAppointment(date, e)}>
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
            selected={date}
            onChange={(startDate) => setDate(startDate)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            inline
          />
          {/* <DatePicker
            selected={date}
            minDate={moment().toDate()}
            onChange={(startDate) => setDate(startDate)}
            inline
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
          /> */}
          <p>{moment(date).format('LT')}</p>
          <p>Duration: {duration} Minutes</p>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default AppConfirmationPage;
