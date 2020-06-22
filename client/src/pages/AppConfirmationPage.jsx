import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/contact.css';

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
      <div className="confirmation">
        <h1 style={{ fontWeight: 'bold' }}>{company}</h1>
        <h3>Invites You To A {duration} Minute Meeting!</h3>
        <hr />
        <form onSubmit={(e) => createAppointment(date, e)}>
          <h2>Select a day</h2>
          <DatePicker
            selected={date}
            minDate={moment().toDate()}
            onChange={(startDate) => setDate(startDate)}
            inline
          />
          <h8>{moment(date).format('dddd')}</h8>
          <br />
          <h8>{moment(date).format('MMMM Do, YYYY')}</h8>
          <hr />
          <h2>Select a Time</h2>
          <h8>Duration: {duration} Minutes</h8>
          <DatePicker
            style={{ marginTop: '10px' }}
            selected={date}
            onChange={(startDate) => setDate(startDate)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            inline
          />
          <h8>{moment(date).format('LT')}</h8>
          <div>
            <button type="submit" className="btn btn-primary button">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AppConfirmationPage;
