import React from 'react';
import { useSelector } from 'react-redux';
import { selectOpenPage } from '../../reducers/appSettingsSlice';
import TableActionRow from './actionRow/TableActionRow';
import AdminActionRow from './actionRow/AdminActionRow';
import EntriesTable from './tables/entriesTable/EntriesTable';
import ExpensesTable from './tables/expensesTable/ExpensesTable';
import { adminRowContainerSX, containerSX } from './mainSX';
import { Container, Stack } from '@mui/material';
import AdminPanel from './adminPanel/AdminPanel';

const Main = () => {
  const openPage = useSelector(selectOpenPage);

  return (
    <>
      <Stack>
        {openPage === 'Entries' ? (
          <>
            <Container sx={containerSX} disableGutters maxWidth={false}>
              <TableActionRow />
            </Container>
            <EntriesTable />
          </>
        ) : openPage === 'Expenses' ? (
          <>
            <Container sx={containerSX} disableGutters maxWidth={false}>
              <TableActionRow />
            </Container>

            <ExpensesTable />
          </>
        ) : (
          <>
            <Container sx={adminRowContainerSX} disableGutters maxWidth={false}>
              <AdminActionRow />
            </Container>
            <AdminPanel />
          </>
        )}
      </Stack>
    </>
  );
};

export default Main;
