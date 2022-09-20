import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EntriesTable from './entriesTable/EntriesTable';
import ExpensesTable from './expensesTable/ExpensesTable';
import { selectSelectValue } from '../../reducers/appSettingsSlice';

const Main = () => {
  const dispatch = useDispatch();
  const selectValue = useSelector(selectSelectValue);

  return (
    <>{selectValue === 'Entries' ? <EntriesTable /> : <ExpensesTable />}</>
  );
};

export default Main;
