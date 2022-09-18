import { configureStore } from '@reduxjs/toolkit';
import entriesReducer from '../reducers/entriesSlice';
import appSettingsReducer from '../reducers/appSettingsSlice';

export const store = configureStore({
  reducer: {
    entries: entriesReducer,
    appSettings: appSettingsReducer,
  },
});

export default store;
