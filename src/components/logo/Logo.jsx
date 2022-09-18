import React from 'react';
import { Typography } from '@mui/material';
import { CalendarMonthTwoTone } from '@mui/icons-material';
import * as SX from './logoSX';

const Logo = () => {
  return (
    <>
      <CalendarMonthTwoTone sx={SX.iconSX} />
      <Typography variant="h4" sx={SX.typoSX}>
        TimeSheets
      </Typography>
    </>
  );
};

export default Logo;
