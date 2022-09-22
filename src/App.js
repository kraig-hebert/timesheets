import React from 'react';
// style imports
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/mainTheme';
import * as SX from './appSettings';
// MUI component imports
import { Box, Container, Grid } from '@mui/material';
// component imports
import Header from './components/header/Header';
import Main from './components/main/Main';
import SideBar from './components/sideBar/SideBar';
import Logo from './components/logo/Logo';
import AddExpenseModal from './components/modals/addModals/AddExpenseModal';
import AddEntryModal from './components/modals/addModals/AddEntryModal';
import EditExpensesModal from './components/modals/editModals/editExpenseModal/EditExpensesModal';
import EditEntryModal from './components/modals/editModals/EditEntryModal';
// import date picker dependancies
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Container
          sx={SX.containerSX}
          fluid="true"
          disableGutters
          maxWidth="100%"
        >
          <Grid container spacing={0}>
            <Grid item xs={2} sx={SX.leftColumnSX}>
              <Box sx={[SX.boxSX, SX.logoSX]}>
                <Logo />
              </Box>
              <Box sx={[SX.boxSX, SX.sideBarSX]}>
                <SideBar />
              </Box>
            </Grid>
            <Grid item xs={10} sx={SX.rightColumnSX}>
              <Box sx={[SX.boxSX, SX.headerSX]}>
                <Header />
              </Box>
              <Box sx={[SX.boxSX, SX.mainSX]}>
                <Main />
              </Box>
            </Grid>
          </Grid>
          <AddExpenseModal />
          <EditExpensesModal />
          <AddEntryModal />
          <EditEntryModal />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
