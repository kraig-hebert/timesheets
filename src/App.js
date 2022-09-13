import React from 'react';
import { useSelector } from 'react-redux';
import { selectEntries } from './reducers/entriesSlice';

function App() {
  const entries = useSelector(selectEntries);
  const renderedListItems = entries.map((entry) => {
    return (
      <li key={entry.id}>
        {entry.location}-{entry.startTime.toLocaleString('en-US')}
      </li>
    );
  });
  return <ul>{renderedListItems}</ul>;
}

export default App;
