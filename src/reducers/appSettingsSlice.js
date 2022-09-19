import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMonth: 'January',
  activeYear: '2022',
  selectValue: 'Entries',
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    monthSelected(state, action) {
      const month = action.payload;
      state.activeMonth = month;
    },
    yearSelected(state, action) {
      const year = action.payload;
      state.activeYear = year;
    },
    selectValueSelected(state, action) {
      const newSelectValue = action.payload;
      state.selectValue = newSelectValue;
    },
  },
});

export const { monthSelected, yearSelected, selectValueSelected } =
  appSettingsSlice.actions;

export const selectActiveMonth = (state) => state.appSettings.activeMonth;
export const selectActiveYear = (state) => state.appSettings.activeYear;
export const selectSelectValue = (state) => state.appSettings.selectValue;

export default appSettingsSlice.reducer;
