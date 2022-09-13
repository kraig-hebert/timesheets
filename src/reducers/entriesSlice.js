import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as client from '../api/client';

const initialState = { entities: {} };

// fetch list of timeshee entries from db.json
export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async () => {
    const response = await client.getEntryList();
    return response;
  }
);

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      const newEntries = {};
      action.payload.forEach((entry) => {
        newEntries[entry.id] = entry;
      });
      state.entities = newEntries;
    });
  },
});

// select all entry entities
export const selectEntryEntities = (state) => state.entries.entities;

// select entries with dateObjects instead of JSON strings
export const selectEntries = createSelector(selectEntryEntities, (entities) => {
  const entryList = Object.values(entities);
  const entryListWithDateObjects = entryList.map((entry) => {
    return {
      ...entry,
      startTime: new Date(entry.startTime),
      endTime: new Date(entry.endTime),
    };
  });
  return entryListWithDateObjects;
});

export default entriesSlice.reducer;
