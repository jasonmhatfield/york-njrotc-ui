/*
Military Time
12:00 AM - 0000
1:00 AM - 0100
2:00 AM - 0200
3:00 AM - 0300
4:00 AM - 0400
5:00 AM - 0500
6:00 AM - 0600
7:00 AM - 0700
8:00 AM - 0800
9:00 AM - 0900
10:00 AM - 1000
11:00 AM - 1100
12:00 PM - 1200
1:00 PM - 1300
2:00 PM - 1400
3:00 PM - 1500
4:00 PM - 1600
5:00 PM - 1700
6:00 PM - 1800
7:00 PM - 1900
8:00 PM - 2000
9:00 PM - 2100
10:00 PM - 2200
11:00 PM - 2300
 */

import React, { useState } from 'react';

const MilitaryTime = () => {
  const [time, setTime] = useState('');

  const handleTimeChange = (event) => {
    const inputTime = event.target.value;
    const militaryTime = convertToMilitaryTime(inputTime);
    setTime(militaryTime);
  };

  const convertToMilitaryTime = (time) => {
    const [hour, minute] = time.split(':');
    const isPM = time.includes('PM');
    const militaryHour = isPM ? parseInt(hour, 10) + 12 : parseInt(hour, 10);
    return `${militaryHour.toString().padStart(2, '0')}:${minute}`;
  };

  return (
    <div className="military-time-container">
      <h1>Military Time Converter</h1>
      <label htmlFor="time-input">Enter a time in 12-hour format:</label>
      <input
        id="time-input"
        type="text"
        value={time}
        onChange={handleTimeChange}
        placeholder="12:00 AM"
      />
    </div>
  );
}

export default MilitaryTime;