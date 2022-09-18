import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { buttonMonthSX } from '../sideBarSX';

const MonthButton = (props) => {
  const dispatch = useDispatch();
  const { month, activeMonth, setActiveMonth } = props;
  const activeButtonMonthSX = () => {
    if (month === activeMonth) {
      return {
        color: 'secondary.main',
      };
    }
  };
  return (
    <Button
      sx={[buttonMonthSX, activeButtonMonthSX]}
      startIcon={month === activeMonth && <KeyboardArrowRight />}
      onClick={() => {
        setActiveMonth(month);
      }}
    >
      <Typography variant="h7">{month}</Typography>
    </Button>
  );
};

MonthButton.propTypes = {
  month: PropTypes.string,
  activeMonth: PropTypes.string,
  activeYear: PropTypes.string,
  setActiveMonth: PropTypes.func,
};

export default MonthButton;
