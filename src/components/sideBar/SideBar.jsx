import React, { useState } from 'react';
import YearButton from './yearButton/YearButton';
import { stackSX } from './sideBarSX';
import { Stack } from '@mui/material';

const SideBar = () => {
  const YEARS = ['2022', '2021', '2020'];

  const [activeYear, setActiveYear] = useState('2022');

  const renderedYearList = YEARS.map((year) => {
    return (
      <YearButton
        year={year}
        activeYear={activeYear}
        setActiveYear={setActiveYear}
        key={year}
      />
    );
  });

  return (
    <Stack sx={stackSX} spacing={0}>
      {renderedYearList}
    </Stack>
  );
};

export default SideBar;
