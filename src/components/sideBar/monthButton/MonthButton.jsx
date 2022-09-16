import React from 'react';
import { Button, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { buttonMonthSX } from '../sideBar';

const MonthButton = (props) => {
  const activeButtonMonthSX = () => {
    if (props.month === props.activeMonth) {
      return {
        color: 'secondary.main',
      };
    }
  };
  return (
    <Button
      sx={[buttonMonthSX, activeButtonMonthSX]}
      startIcon={props.month === props.activeMonth && <KeyboardArrowRight />}
      onClick={() => {
        props.setActiveMonth(props.month);
      }}
    >
      <Typography variant="h7">{props.month}</Typography>
    </Button>
  );
};

export default MonthButton;
