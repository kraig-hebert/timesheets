import React, { useState } from 'react';
import { buttonYearSX } from '../sideBar';
import MonthButton from '../monthButton/MonthButton';
import { Button, Stack } from '@mui/material';
import { LastPage } from '@mui/icons-material';

const YearButton = (props) => {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Novemer',
    'December',
  ];
  const [activeMonth, setActiveMonth] = useState('January');
  const renderedMonthList = MONTHS.map((month) => {
    return (
      <MonthButton
        month={month}
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
        key={month}
      />
    );
  });

  return (
    <>
      <Button
        sx={buttonYearSX}
        onClick={() => {
          props.setActiveYear(props.year);
        }}
        startIcon={props.year === props.activeYear && <LastPage />}
      >
        {props.year}
      </Button>
      {props.year === props.activeYear && <Stack>{renderedMonthList}</Stack>}
    </>
  );
};

export default YearButton;
