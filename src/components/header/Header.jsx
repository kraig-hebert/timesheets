import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectValue,
  selectValueSelected,
} from '../../reducers/appSettingsSlice';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import * as SX from './headerSX';

const Header = () => {
  const dispatch = useDispatch();
  const selectValue = useSelector(selectSelectValue);
  return (
    <>
      <TextField
        label="Search Events"
        variant="filled"
        size="small"
        sx={SX.textFieldSX}
      />
      <FormControl>
        <InputLabel id="sheet-selector-lbael" sx={SX.labelSX}>
          Sheet Type
        </InputLabel>
        <Select
          labelId="sheet-selector-label"
          id="sheet-selector"
          value={selectValue}
          label="Sheet Type"
          onChange={(e) => {
            dispatch(selectValueSelected(e.target.value));
          }}
          sx={SX.selectSX}
        >
          <MenuItem value="Entries">Entries</MenuItem>
          <MenuItem value="Expenses">Expenses</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Header;
