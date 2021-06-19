import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import './App.css';

const calendarDates = Array(31)
  .fill(0)
  .map((e, i) => i);

export default function App() {

  const [choosingType, setChoosingType] = useState('start');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

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

  const checkInBetween = (day) => {
    if (startDate && !endDate) return day > startDate && day < hoverDate;
    return day > startDate && day < endDate;
  }

  return (
    <>
      <StyledDateChooser>
        <StyledDateChooserButton
          onClick={() => setChoosingType('start')}
          isChoosing={choosingType === 'start'}
        >
          Start Date <span>{startDate}</span>
        </StyledDateChooserButton>
        <StyledDateChooserButton
          onClick={() => setChoosingType('end')}
          isChoosing={choosingType === 'end'}
        >
          End Date <span>{endDate}</span>
        </StyledDateChooserButton>
        <StyledDateChooserButton>
          Days Range <span>{endDate ? endDate - startDate : 0}</span>
        </StyledDateChooserButton>
      </StyledDateChooser>

      <StyledCalendar>
        {calendarDates.map((day, index) => {
          const dayNumber = day + 1;

          let isInBetween = checkInBetween(dayNumber);
          let isSelected = dayNumber === startDate || dayNumber === endDate;

          return <StyledCalendarDay
            key={index}
            isInBetween={isInBetween}
            isSelected={isSelected}
            onClick={() => updateDate(dayNumber)}
            onMouseOver={() => setHoverDate(dayNumber)}
          >
            {dayNumber}
          </StyledCalendarDay>;
        })}
      </StyledCalendar>
    </>
  );
}

const StyledDateChooser = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const StyledDateChooserButton = styled.button`
  color: #0b204c;
  text-transform: uppercase;
  flex: 1;
  padding: 15px;
  background: none;
  cursor: pointer;
  border: none;
  border-bottom: 2px solid rgba(11, 32, 76, 0.2);
  outline: none;
  border-color: ${(props) => props.isChoosing ? '#8b284c' : 'none'};

  span {
    display: block;
    min-height: 60px;
    font-size: 50px;
  }
`;

const StyledCalendar = styled.div`
  max-width: 400px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: #0b204c;
  color: #fff;
  padding: 20px;
`;

const StyledCalendarDay = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: 0.3s ease background;
  border: none;
  outline: none;
  cursor: pointer;
  color: #8096c1;
  background: none;

  ${(props) =>
          props.isInBetween && css`
      color: #eee;
      background: #001031 !important;
    `
  };
  
  ${(props) => 
    props.isSelected && css`
      color: #eee;
      background: #1a1a1a !important;
    `
  };
  
  &:hover {
    color: #eee;
    background: #254381;
  }
`;
