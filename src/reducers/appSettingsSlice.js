import { createSlice } from '@reduxjs/toolkit';
import { getMonthName } from '../helpers/dateHelpers';

const initialState = {
  activeMonth: getMonthName(new Date().getMonth()),
  activeYear: new Date().getFullYear().toString(),
  selectValue: 'Entries',
  activeModal: 'expenses',
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
    modalOpened(state, action) {
      const activeModal = action.payload;
      state.activeModal = activeModal;
    },
    modalClosed(state, action) {
      const activeModal = action.payload;
      state.activeModal = activeModal;
    },
  },
});

export const {
  monthSelected,
  yearSelected,
  selectValueSelected,
  modalOpened,
  modalClosed,
} = appSettingsSlice.actions;

export const selectActiveMonth = (state) => state.appSettings.activeMonth;
export const selectActiveYear = (state) => state.appSettings.activeYear;
export const selectSelectValue = (state) => state.appSettings.selectValue;
export const selectActiveModal = (state) => state.appSettings.activeModal;

export default appSettingsSlice.reducer;
