import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { buttonYearSX } from '../sideBarSX';
import MonthButton from '../monthButton/MonthButton';
import { Button, Stack, Typography } from '@mui/material';
import { LastPage } from '@mui/icons-material';
import { MONTHS } from '../../../helpers/dateHelpers';
import {
  selectActiveYear,
  yearSelected,
} from '../../../reducers/appSettingsSlice';

const YearButton = (props) => {
  const { year } = props;
  const dispatch = useDispatch();
  const activeYear = useSelector(selectActiveYear);
  const renderedMonthList = MONTHS.map((month) => {
    return <MonthButton month={month} key={month} />;
  });

  return (
    <>
      <Button
        sx={buttonYearSX}
        onClick={() => {
          dispatch(yearSelected(year));
        }}
        startIcon={year === activeYear && <LastPage />}
      >
        <Typography variant="h6">{year}</Typography>
      </Button>
      {year === activeYear && <Stack>{renderedMonthList}</Stack>}
    </>
  );
};

YearButton.propTypes = {
  year: PropTypes.string,
};

export default YearButton;
