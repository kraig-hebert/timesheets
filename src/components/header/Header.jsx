import React from 'react';
import { TextField } from '@mui/material';
import * as SX from './headerSX';

const Header = () => {
  return (
    <>
      <TextField label="Search Events" variant="filled" sx={SX.textFieldSX} />
    </>
  );
};

export default Header;
