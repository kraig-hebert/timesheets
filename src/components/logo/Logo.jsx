import React from 'react';
import { Typography } from '@mui/material';
import { CalendarMonthTwoTone } from '@mui/icons-material';

const Logo = () => {
  return (
    <>
      <CalendarMonthTwoTone sx={{ fontSize: '50px' }} />
      <Typography variant="h4" sx={{ alignItems: 'center', paddingTop: '7px' }}>
        Timesheets
      </Typography>
    </>
  );
};

export default Logo;
