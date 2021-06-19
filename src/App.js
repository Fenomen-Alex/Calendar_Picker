import React, {useState} from 'react';
import './App.css';

const calendarDates = Array(31)
  .fill(0)
  .map((e, i) => i);

export default function App() {

  const [choosingType, setChoosingType] = useState('start');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const updateDate = (chosenDay) => {
    if (startDate && chosenDay < startDate) {
      setStartDate(chosenDay);
      return setChoosingType('end');
    }

    if (endDate && chosenDay > endDate) {
      setEndDate(chosenDay);
      return setChoosingType('end');
    }

    if (choosingType === 'start') {
      setStartDate(chosenDay);
      return setChoosingType('end');
    }

    if (choosingType === 'end') {
      setEndDate(chosenDay);
    }
  }

  return (
    <>
      <div className="date-chooser">
        <button
          className="date-chooser-button"
          onClick={() => setChoosingType('start')}
        >
          Start Date <span>{startDate}</span>
        </button>
        <button
          className="date-chooser-button"
          onClick={() => setChoosingType('end')}

        >
          End Date <span>{endDate}</span>
        </button>
      </div>

      <div className="calendar">
        {calendarDates.map((day, index) => {
          const dayNumber = day + 1;
          return <button
            key={index}
            className="calendar-day"
            onClick={() => updateDate(dayNumber)}
          >
            {dayNumber}
          </button>;
        })}
      </div>
    </>
  );
}
