import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EntriesTable from './entriesTable/EntriesTable';
import ExpensesTable from './expensesTable/ExpensesTable';
import { Button } from '@mui/material';

import { selectFilteredExpenses } from '../../reducers/expensesSlice';

const Main = () => {
  let lastStyle = 'type2';

  const dispatch = useDispatch();
  const filteredExpenses = useSelector(selectFilteredExpenses);

  // dummy data for testing saveNewExpense()
  const handleAdd = () => {};

  return (
    <>
      <ExpensesTable />
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
