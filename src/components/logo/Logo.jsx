import React from 'react';
import { Typography } from '@mui/material';
import { CalendarMonthTwoTone } from '@mui/icons-material';

const Logo = () => {
  return (
    <>
      <CalendarMonthTwoTone sx={{ fontSize: '50px' }} />
      <Typography
        variant="h4"
        sx={{ alignItems: 'center', margin: '7px 0 0 7px' }}
      >
        TimeSheets
      </Typography>
    </>
  );
};

export default Logo;
