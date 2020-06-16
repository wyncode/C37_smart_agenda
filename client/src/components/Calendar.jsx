import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './main.scss'

export default class Calendar extends React.Component {

  render() {
    return (
      <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
    )
  }

}