import { configureStore } from '@reduxjs/toolkit';
import entriesReducer from '../reducers/entriesSlice';
import appSettingsReducer from '../reducers/appSettingsSlice';
import expensesReducer from '../reducers/expensesSlice';
import usersReducer from '../reducers/usersSlice';

export const store = configureStore({
  reducer: {
    entries: entriesReducer,
    expenses: expensesReducer,
    appSettings: appSettingsReducer,
    users: usersReducer,
  },
});

export default store;
