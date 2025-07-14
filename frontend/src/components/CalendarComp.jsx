import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';
import "../calendar-tailwind.css";
import 'react-calendar/dist/Calendar.css';

const CalendarComp = ({ value, onChange }) => (
  <div className="w-70 h-50 mx-auto bg-transparent">
    <Calendar 
      value={value}
      onChange={onChange}
    />
  </div>
);

export default CalendarComp;
