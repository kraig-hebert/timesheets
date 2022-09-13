import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import { fetchEntries } from './reducers/entriesSlice';

const container = document.getElementById('root');
const root = createRoot(container);
store.dispatch(fetchEntries());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
