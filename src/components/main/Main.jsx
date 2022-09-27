import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectValue } from '../../reducers/appSettingsSlice';
import ActionRow from './actionRow/ActionRow';
import EntriesTable from './tables/entriesTable/EntriesTable';
import ExpensesTable from './tables/expensesTable/ExpensesTable';
import { containerSX } from './mainSX';
import { Container, Stack } from '@mui/material';

const Main = () => {
  const selectValue = useSelector(selectSelectValue);

  return (
    <>
      <Stack>
        <Container sx={containerSX} disableGutters maxWidth={false}>
          <ActionRow />
        </Container>
        {selectValue === 'Entries' ? <EntriesTable /> : <ExpensesTable />}
      </Stack>
    </>
  );
};

export default Main;
