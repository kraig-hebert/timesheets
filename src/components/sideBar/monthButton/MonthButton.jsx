import React from 'react';
import { Button } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { buttonMonthSX } from '../sideBar';

const MonthButton = (props) => {
  return (
    <Button
      sx={buttonMonthSX}
      startIcon={props.month === props.activeMonth && <KeyboardArrowRight />}
      onClick={() => {
        props.setActiveMonth(props.month);
      }}
    >
      {props.month}
    </Button>
  );
};

export default MonthButton;
