import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const entriesAdaptor = createEntityAdapter();

const initialState = entriesAdaptor.getInitialState({});

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
});

export const {} = entriesSlice.actions;

export default entriesSlice.reducer;
