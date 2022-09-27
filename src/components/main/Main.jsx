import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectValue } from '../../reducers/appSettingsSlice';
import EntriesTable from './tables/entriesTable/EntriesTable';
import ExpensesTable from './tables/expensesTable/ExpensesTable';

const Main = () => {
  const selectValue = useSelector(selectSelectValue);

  return (
    <>{selectValue === 'Entries' ? <EntriesTable /> : <ExpensesTable />}</>
  );
};

export default Main;
