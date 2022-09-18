import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as client from '../api/client';
import { MONTHS } from '../helpers/dateHelpers';

const initialState = { entities: {} };

// fetch list of timesheet entries from db.json
export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async () => {
    const response = await client.get();
    return response;
  }
);

// save new entry to db.json and update state.entries.entities
export const saveNewEntry = createAsyncThunk(
  'entries/saveNewEntry',
  async (entry) => {
    const response = await client.post(entry);
    if (response.status === 201) {
      return entry;
    }
  }
);

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.fulfilled, (state, action) => {
        const newEntries = {};
        action.payload.forEach((entry) => {
          newEntries[entry.id] = entry;
        });
        state.entities = newEntries;
      })
      .addCase(saveNewEntry.fulfilled, (state, action) => {
        const entry = action.payload;
        state.entities[entry.id] = entry;
      });
  },
});

// select all entry entities
export const selectEntryEntities = (state) => state.entries.entities;

//select activeMonth from appSettings
export const selectActiveMonth = (state) => state.appSettings.activeMonth;
//select activeYear from appSettings
export const selectActiveYear = (state) => state.appSettings.activeYear;

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

// select entries filtered by month and year
export const selectFilteredEntries = createSelector(
  selectActiveMonth,
  selectActiveYear,
  selectEntries,
  (activeMonth, activeYear, entries) => {
    const filteredEntries = entries.filter(
      (entry) =>
        MONTHS[entry.startTime.getMonth()] === activeMonth &&
        entry.startTime.getFullYear().toString() === activeYear
    );
    return filteredEntries;
  }
);

export default entriesSlice.reducer;
