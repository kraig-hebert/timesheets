import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EntriesTable from './entriesTable/EntriesTable';
import ExpensesTable from './expensesTable/ExpensesTable';
import { Button } from '@mui/material';
import { selectSelectValue } from '../../reducers/appSettingsSlice';
import { saveNewExpense } from '../../reducers/expensesSlice';

const Main = () => {
  const dispatch = useDispatch();
  const selectValue = useSelector(selectSelectValue);

  // dummy data for testing saveNewExpense()
  const handleAdd = () => {
    const newExpense = {
      id: 5,
      destination: 'GreanMeadow School',
      miles: 50,
      date: '2022-07-26T18:00:00.788Z',
    };
    dispatch(saveNewExpense(newExpense));
  };

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
