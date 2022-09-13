import { configureStore } from '@reduxjs/toolkit';
import entriesReducer from '../reducers/entriesSlice';

export const store = configureStore({
  reducer: {
    entries: entriesReducer,
  },
});

export default store;
