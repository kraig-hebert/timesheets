import { configureStore } from '@reduxjs/toolkit';
import entriesSlice from '../reducers/entriesSlice';

export const store = configureStore({
  reducer: {
    entries: entriesSlice,
  },
});
