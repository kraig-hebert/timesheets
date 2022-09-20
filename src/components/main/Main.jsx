import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EntriesTable from './entriesTable/EntriesTable';
import ExpensesTable from './expensesTable/ExpensesTable';
import { Button } from '@mui/material';
import { selectSelectValue } from '../../reducers/appSettingsSlice';

const Main = () => {
  const dispatch = useDispatch();
  const selectValue = useSelector(selectSelectValue);

  // dummy data for testing saveNewExpense()
  const handleAdd = () => {};

  return (
    <>
      {selectValue === 'Entries' ? <EntriesTable /> : <ExpensesTable />}
      {/* temp button to test saveNewEntry() */}
      <Button
        variant="outlined"
        onClick={() => {
          handleAdd();
        }}
      >
        AddEntry
      </Button>
    </>
  );
};

export default Main;
