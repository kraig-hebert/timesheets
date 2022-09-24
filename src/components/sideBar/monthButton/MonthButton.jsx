import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { buttonMonthSX } from '../sideBarSX';
import {
  monthSelected,
  selectActiveMonth,
} from '../../../reducers/appSettingsSlice';

const MonthButton = (props) => {
  const { month } = props;
  const dispatch = useDispatch();
  const activeMonth = useSelector(selectActiveMonth);

  const activeButtonMonthSX = () => {
    if (month === activeMonth)
      return {
        color: 'secondary.main',
      };
  };
  return (
    <Button
      sx={[buttonMonthSX, activeButtonMonthSX]}
      startIcon={month === activeMonth && <KeyboardArrowRight />}
      onClick={() => {
        dispatch(monthSelected(month));
      }}
    >
      <Typography variant="h7">{month}</Typography>
    </Button>
  );
};

MonthButton.propTypes = {
  month: PropTypes.string,
};

export default MonthButton;
