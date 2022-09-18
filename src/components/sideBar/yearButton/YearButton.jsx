import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { buttonYearSX } from '../sideBarSX';
import MonthButton from '../monthButton/MonthButton';
import { Button, Stack, Typography } from '@mui/material';
import { LastPage } from '@mui/icons-material';
import { MONTHS } from '../../../helpers/dateHelpers';

const YearButton = (props) => {
  const { year, activeYear, setActiveYear } = props;
  const [activeMonth, setActiveMonth] = useState('January');
  const renderedMonthList = MONTHS.map((month) => {
    return (
      <MonthButton
        month={month}
        activeMonth={activeMonth}
        activeYear={activeYear}
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
          setActiveYear(year);
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
  activeYear: PropTypes.string,
  setActiveYear: PropTypes.func,
};

export default YearButton;
