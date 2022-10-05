import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openPageSelected,
  selectSheetType,
  selectEmployeeSelectValue,
  employeeSelectValueSelected,
} from '../../../reducers/appSettingsSlice';
import {
  selectEntrySearchValue,
  entrySearchValueChanged,
} from '../../../reducers/entriesSlice';
import {
  selectExpenseSearchValue,
  expenseSearchValueChanged,
  expenseSearchToggled,
} from '../../../reducers/expensesSlice';
import * as SX from './actionRowSX';
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

const TableActionRow = () => {
  const dispatch = useDispatch();
  const sheetType = useSelector(selectSheetType);
  const entrySearchValue = useSelector(selectEntrySearchValue);
  const expenseSearchValue = useSelector(selectExpenseSearchValue);
  const employeeSelectValue = useSelector(selectEmployeeSelectValue);
  const users = useSelector(selectUsers);

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
        label={`Search ${sheetType}`}
        size="small"
        value={sheetType === 'Entries' ? entrySearchValue : expenseSearchValue}
        onChange={(e) => {
          if (sheetType === 'Entries')
            dispatch(entrySearchValueChanged(e.target.value));
          else dispatch(expenseSearchValueChanged(e.target.value));
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  if (sheetType === 'Entries') {
                    console.log('entries');
                  } else {
                    dispatch(expenseSearchToggled());
                  }
                }}
              >
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
          placeholder="Select Sheet Type"
          value={sheetType}
          label="Sheet Type"
          onChange={(e) => {
            dispatch(openPageSelected(e.target.value));
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

export default TableActionRow;
