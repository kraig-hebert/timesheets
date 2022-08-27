import { createSlice } from '@reduxjs/toolkit';

const initialState = { entities: {} };

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
});

export const {} = entriesSlice.actions;

export default entriesSlice.reducer;
