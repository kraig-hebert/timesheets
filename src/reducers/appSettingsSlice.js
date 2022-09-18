import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMonth: 'January',
  activeYear: '2022',
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
  },
});

export const { monthSelected, yearSelected } = appSettingsSlice.actions;

export const selectActiveMonth = (state) => state.appSettings.activeMonth;
export const selectActiveYear = (state) => state.appSettings.activeYear;

export default appSettingsSlice.reducer;
