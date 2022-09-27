import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSheetTypeSelectValue,
  sheetTypeSelectValueSelected,
  selectEmployeeSelectValue,
  employeeSelectValueSelected,
} from '../../../reducers/appSettingsSlice';
import * as SX from '../actionRow/actionRowSX';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const ActionRow = () => {
  const dispatch = useDispatch();
  const sheetTypeSelectValue = useSelector(selectSheetTypeSelectValue);
  const employeeSelectValue = useSelector(selectEmployeeSelectValue);

  return (
    <>
      <TextField label="Search Events" size="small" sx={SX.textFieldSX} />
      <FormControl>
        <InputLabel id="sheet-selector-label" sx={SX.labelSX}>
          Sheet Type
        </InputLabel>
        <Select
          labelId="sheet-selector-label"
          id="sheet-selector"
          size="small"
          value={sheetTypeSelectValue}
          label="Sheet Type"
          onChange={(e) => {
            dispatch(sheetTypeSelectValueSelected(e.target.value));
          }}
          sx={SX.selectSX}
        >
          <MenuItem value="Entries">Entries</MenuItem>
          <MenuItem value="Expenses">Expenses</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="employee-selector-label" sx={SX.labelSX}>
          Employee
        </InputLabel>
        <Select
          labelId="employee-selector-label"
          id="employee-selector"
          size="small"
          value={employeeSelectValue}
          label="Sheet Type"
          onChange={(e) => {
            dispatch(employeeSelectValueSelected(e.target.value));
          }}
          sx={SX.selectSX}
        >
          <MenuItem value="Kraig Hebert">Kraig Hebert</MenuItem>
          <MenuItem value="Kara Canata">Kara Canata</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default ActionRow;
