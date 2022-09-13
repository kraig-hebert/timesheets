import React from 'react';
// state imports
import { useSelector } from 'react-redux';
import { selectEntries } from './reducers/entriesSlice';
// style imports
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/mainTheme';
import { containerSX } from './appSettings';
// MUI component imports
import { Container } from '@mui/material';
// component imports
import Header from './components/header/Header';
import Main from './components/main/Main';
import SideBar from './components/sideBar/SideBar';
function App() {
  const entries = useSelector(selectEntries);
  const renderedListItems = entries.map((entry) => {
    return (
      <li key={entry.id}>
        {entry.location}-{entry.startTime.toLocaleString('en-US')}
      </li>
    );
  });
  return (
    <ThemeProvider theme={theme}>
      <Container sx={containerSX} fluid="true" disableGutters maxWidth="100%">
        {/* <ul>{renderedListItems}</ul> */}
        <Header />
        <Main />
        <SideBar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
