import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as client from '../api/client';
import { MONTHS } from '../helpers/dateHelpers';
import { selectEmployee } from './appSettingsSlice';

const initialState = { entities: {}, editEntryRowID: '' };

// return next available id
const getID = (entryList) =>
  entryList.length ? entryList[entryList.length - 1].id + 1 : 1;

// fetch list of timesheet entries from db.json
export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async () => await client.get('entries')
);

// save new entry to db.json and update state.entries.entities
export const saveNewEntry = createAsyncThunk(
  'entries/saveNewEntry',
  async (entry, { getState }) => {
    const state = getState();
    const newEntry = {
      ...entry,
      id: getID(Object.values(state.expenses.entities)),
    };
    const response = await client.post(entry, 'entries');
    if (response.status === 201) return newEntry;
  }
);

// edit entry in db and update state.entries.entities
export const editEntry = createAsyncThunk(
  'entries/editEntry',
  async (entry) => {
    const response = await client.patch(entry, 'entries');
    if (response.status === 200) return entry;
  }
);

// delete entry from db and update state.entries.entities
export const deleteEntry = createAsyncThunk(
  'entries/deleteEntry',
  async (id) => {
    const response = await client.remove(id, 'entries');
    if (response.status === 200) return id;
  }
);

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    entryRowClicked(state, action) {
      const id = action.payload;
      state.editEntryRowID = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.fulfilled, (state, action) => {
        const newEntries = {};
        const entryList = action.payload;
        entryList.forEach((entry) => {
          newEntries[entry.id] = entry;
        });
        state.entities = newEntries;
      })
      .addCase(saveNewEntry.fulfilled, (state, action) => {
        const entry = action.payload;
        state.entities[entry.id] = entry;
      })
      .addCase(editEntry.fulfilled, (state, action) => {
        const entry = action.payload;
        state.entities[entry.id] = entry;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        const id = action.payload;
        const newEntries = {};
        Object.values(state.entities).forEach((entry) => {
          if (id != entry.id) newEntries[entry.id] = entry;
        });
        state.entities = newEntries;
      });
  },
});

export const { entryRowClicked } = entriesSlice.actions;

// selectors
export const selectEntryEntities = (state) => state.entries.entities;
export const selectEditEntryRowID = (state) => state.entries.editEntryRowID;

// selectors from appSettingsSlice
const selectActiveMonth = (state) => state.appSettings.activeMonth;
const selectActiveYear = (state) => state.appSettings.activeYear;

// select entries with dateObjects instead of JSON strings
export const selectEntries = createSelector(selectEntryEntities, (entities) => {
  const sortedEntryListWithDateObjects = Object.values(entities)
    .map((entry) => {
      return {
        ...entry,
        startTime: new Date(entry.startTime),
        endTime: new Date(entry.endTime),
      };
    })
    .sort((entryA, entryB) => entryA.startTime - entryB.startTime);
  return sortedEntryListWithDateObjects;
});

// select entry for edit
export const selectEditEntry = createSelector(
  selectEditEntryRowID,
  selectEntries,
  (id, entries) => {
    const editEntryList = entries.filter((entry) => entry.id === id);
    return editEntryList[0];
  }
);

// select entries filtered by month and year
export const selectFilteredEntries = createSelector(
  selectActiveMonth,
  selectActiveYear,
  selectEmployee,
  selectEntries,
  (activeMonth, activeYear, employee, entries) => {
    // skips error when no employee exists on initial page load
    if (!employee) return [];

    const filteredEntries = entries.filter(
      (entry) =>
        MONTHS[entry.startTime.getMonth()] === activeMonth &&
        entry.startTime.getFullYear().toString() === activeYear &&
        entry.userId === employee.id
    );
    return filteredEntries;
  }
);

export default entriesSlice.reducer;
