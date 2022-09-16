import React from 'react';
// state imports
import { useSelector } from 'react-redux';
import { selectEntries } from './reducers/entriesSlice';
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

function App() {
  // const entries = useSelector(selectEntries);

  // const renderedListItems = entries.map((entry) => {
  //   return (
  //     <li key={entry.id}>
  //       {entry.location}-{entry.startTime.toLocaleString('en-US')}
  //     </li>
  //   );
  // });

  return (
    <ThemeProvider theme={theme}>
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
        {/* <ul>{renderedListItems}</ul> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
