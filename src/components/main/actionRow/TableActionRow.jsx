import React, { useEffect, useState } from 'react';
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
  selectEntrySearchActive,
  entrySearchToggled,
} from '../../../reducers/entriesSlice';
import {
  selectExpenseSearchValue,
  expenseSearchValueChanged,
  selectExpenseSearchActive,
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
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { selectUsers } from '../../../reducers/usersSlice';

const TableActionRow = () => {
  const dispatch = useDispatch();
  const sheetType = useSelector(selectSheetType);
  const entrySearchValue = useSelector(selectEntrySearchValue);
  const entrySearchActive = useSelector(selectEntrySearchActive);
  const expenseSearchValue = useSelector(selectExpenseSearchValue);
  const expenseSearchActive = useSelector(selectExpenseSearchActive);
  const employeeSelectValue = useSelector(selectEmployeeSelectValue);
  const users = useSelector(selectUsers);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleEntrySearchIconClick = (e) => {
    dispatch(entrySearchToggled());
    if (!entrySearchActive) setAnchorEl(e.currentTarget);
    else setAnchorEl(null);
  };
  const handleExpenseSearchIconClick = (e) => {
    dispatch(expenseSearchToggled());
    if (!expenseSearchActive) setAnchorEl(e.currentTarget);
    else setAnchorEl(null);
  };

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
                    handleEntrySearchIconClick(e);
                  } else {
                    handleExpenseSearchIconClick(e);
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
      <Popover
        id="mouse-over-popover"
        sx={SX.popoverSX}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 10,
          horizontal: -20,
        }}
        onClose={(e) => {
          setAnchorEl(null);
        }}
        elevation={0}
      >
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ width: '100px' }}
        >
          <Typography varaint="h7">Search Active</Typography>
        </Stack>
      </Popover>

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
          disabled={entrySearchActive | expenseSearchActive}
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
