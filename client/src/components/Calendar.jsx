import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from 'axios';

import './main.scss'

const Calendar = () => {
 
  let [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/appointments/company', {
      headers: {
        //after tests, replace the token string to : localStorage.getItem('token') 
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWVhN2EwYTc4MzJmODAzZjg4MTJhNmEiLCJpYXQiOjE1OTI0MzY4ODJ9.AycTluzylt6Qc4se6TfN7ArE-yEjKbedFwAR14V68Uw'
        
      }
    }).then(({data}) => {
      setAppointments(data)
    }).catch(console.log)
  }, [])

  const appointmentView = appointments.map(app => { return { date: app?.date, title: app?.time}})
  return (
    <FullCalendar defaultiView="dayGridMonth" plugins={[dayGridPlugin]}
    weekends={true}
    events={appointmentView} />
  )
}
 export default Calendar;