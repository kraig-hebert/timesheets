import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import * as SX from './headerSX';

const Header = () => {
  return (
    <>
      <TextField
        label="Search Events"
        variant="filled"
        size="small"
        sx={SX.textFieldSX}
      />
      <FormControl>
        <InputLabel id="sheet-selector-lbael">Sheet Type</InputLabel>
        <Select
          labelId="sheet-selector-lbael"
          id="sheet-selector"
          value=""
          label="Sheet Type"
          onChange={() => {}}
          sx={SX.selectSX}
        >
          <MenuItem value="events">Events</MenuItem>
          <MenuItem value="expenses">Expenses</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Header;
