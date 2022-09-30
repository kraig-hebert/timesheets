import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSheetTypeSelectValue,
  sheetTypeSelectValueSelected,
  selectEmployeeSelectValue,
  employeeSelectValueSelected,
} from '../../../reducers/appSettingsSlice';
import * as SX from '../actionRow/actionRowSX';
import { Search } from '@mui/icons-material';

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { selectUsers } from '../../../reducers/usersSlice';

const ActionRow = () => {
  const dispatch = useDispatch();
  const sheetTypeSelectValue = useSelector(selectSheetTypeSelectValue);
  const employeeSelectValue = useSelector(selectEmployeeSelectValue);
  const users = useSelector(selectUsers);
  const [searchValue, setSearchValue] = useState('');

  let renderedUserMenuItems = [];
  if (users[0] != '') {
    renderedUserMenuItems = users.map((user) => (
      <MenuItem
        key={user.id}
        value={`${user.firstName} ${user.lastName}`}
      >{`${user.firstName} ${user.lastName}`}</MenuItem>
    ));
  }

  useEffect(() => {
    if (users.length > 0 && users[0] != '') {
      const user = users[0];
      dispatch(
        employeeSelectValueSelected(`${user.firstName} ${user.lastName}`)
      );
    }
  }, [users]);

  return (
    <>
      <TextField
        label={`Search ${sheetTypeSelectValue}`}
        size="small"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="secondary">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={SX.textFieldSX}
      />
      <FormControl>
        <InputLabel id="sheet-selector-label" sx={SX.labelSX}>
          Sheet Type
        </InputLabel>
        <Select
          labelId="sheet-selector-label"
          id="sheet-selector"
          size="small"
          placeholder="SelectUser"
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
          value={users[0] != [''] ? employeeSelectValue : 'None'}
          label="Employee"
          onChange={(e) => {
            dispatch(employeeSelectValueSelected(e.target.value));
          }}
          sx={SX.selectSX}
        >
          {users[0] != [''] ? (
            renderedUserMenuItems
          ) : (
            <MenuItem value="None">None</MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
};

export default ActionRow;
