import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePick = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date('06-10-2020')} //dynamic change
        maxDate={new Date('06-26-2020')}
        inline
      />
    </div>
  );
};

export default DatePick;
