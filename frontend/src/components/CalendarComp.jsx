import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';
import "../calendar-tailwind.css";
import 'react-calendar/dist/Calendar.css';

const CalendarComp = () => {
    const [value, onChange] = useState(new Date());
  // Example: mark these dates
  const markedDates = [
    new Date(2025, 5, 24),
    new Date(2025, 5, 25),
  ];

  return (
    <div className="w-70 h-50 mx-auto bg-transparent">
  <Calendar />
</div>

  )
}

export default CalendarComp
