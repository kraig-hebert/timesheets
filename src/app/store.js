import { configureStore } from '@reduxjs/toolkit';
import entriesReducer from '../reducers/entriesSlice';
import appSettingsReducer from '../reducers/appSettingsSlice';
import expensesReducer from '../reducers/expensesSlice';

export const store = configureStore({
  reducer: {
    entries: entriesReducer,
    expenses: expensesReducer,
    appSettings: appSettingsReducer,
  },
});

export default store;
