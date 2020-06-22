import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import './Calendar.scss';
import building from '../images/building.png';
import '../css/logo.css';

const Calendar = () => {
  let [company, setCompany] = useState([]);
  let [appointments, setAppointments] = useState([]);

  //getting Company's name to display above calendar

  useEffect(() => {
    axios
      .get('/companies/me', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        setCompany(data);
      })
      .catch((e) => {
        'Error';
      });
  });

  //getting all appointments of this company
  useEffect(() => {
    axios
      .get('/appointments/company', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        setAppointments(data);
        console.log(data);
      })
      .catch(console.log);
  }, []);

  const appointmentView = appointments.map((app) => {
    return { date: app?.date, title: app?.customerName };
  });
  return (
    <>
      <div>
        <br />
        <h2 className="phrase_top">
          <img src={building} className="logo" /> Hi{' '}
          {company.companyName?.toUpperCase()}! These are your appointments.
        </h2>
      </div>
      <div className="calendarStyle">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          weekends={true}
          events={appointmentView}
          handleWindowResize={true}
        />
      </div>
    </>
  );
};

export default Calendar;
