import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as client from '../api/client';
import { MONTHS } from '../helpers/dateHelpers';

const initialState = { entities: {}, editEntryRowID: '' };

const getID = (entryList) => {
  const id = entryList.length ? entryList[entryList.length - 1].id + 1 : 1;
  return id;
};

// fetch list of timesheet entries from db.json
export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async () => {
    const response = await client.get('entries');
    return response;
  }
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
        action.payload.forEach((entry) => {
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
        state.entities = Object.values(state.entities).filter(
          (entry) => entry.id != id
        );
      });
  },
});

export const { entryRowClicked } = entriesSlice.actions;

// select all entry entities
export const selectEntryEntities = (state) => state.entries.entities;

// select editRowEntryValue
export const selectEditEntryRowID = (state) => state.entries.editEntryRowID;

//select activeMonth from appSettings
const selectActiveMonth = (state) => state.appSettings.activeMonth;
//select activeYear from appSettings
const selectActiveYear = (state) => state.appSettings.activeYear;

// select entries with dateObjects instead of JSON strings
export const selectEntries = createSelector(selectEntryEntities, (entities) => {
  const entryList = Object.values(entities);
  const sortedEntryListWithDateObjects = entryList
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
