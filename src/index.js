import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import store from './app/store';
import App from './App';
import { fetchEntries } from './reducers/entriesSlice';
import './index.css';
import { fetchExpenses } from './reducers/expensesSlice';
import { fetchUsers, selectUsers } from './reducers/usersSlice';
import { employeeSelectValueSelected } from './reducers/appSettingsSlice';

const container = document.getElementById('root');
const root = createRoot(container);
store.dispatch(fetchEntries());
store.dispatch(fetchExpenses());
store.dispatch(fetchUsers());
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
