import React from 'react';
import { Button } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import * as SX from './sideBar';

const SideBar = () => {
  return (
    <>
      <Button
        sx={SX.buttonSX}
        onClick={() => {}}
        startIcon={<KeyboardArrowRight />}
      >
        2022
      </Button>
    </>
  );
};

export default SideBar;
