import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectValue } from '../../reducers/appSettingsSlice';
import EntriesTable from './entriesTable/EntriesTable';
import ExpensesTable from './expensesTable/ExpensesTable';

const Main = () => {
  const selectValue = useSelector(selectSelectValue);

  return (
    <>{selectValue === 'Entries' ? <EntriesTable /> : <ExpensesTable />}</>
  );
};

export default Main;
