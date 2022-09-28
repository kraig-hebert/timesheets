import { createSelector, createSlice } from '@reduxjs/toolkit';
import { getMonthName } from '../helpers/dateHelpers';
import { selectUsers } from './usersSlice';

const initialState = {
  activeMonth: getMonthName(new Date().getMonth()),
  activeYear: new Date().getFullYear().toString(),
  sheetTypeSelectValue: 'Expenses',
  employeeSelectValue: '',
  activeEmployeeId: 0,
  activeModal: 'none',
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
    sheetTypeSelectValueSelected(state, action) {
      const newSheetTypeSelectValue = action.payload;
      state.sheetTypeSelectValue = newSheetTypeSelectValue;
    },
    employeeSelectValueSelected(state, action) {
      const newEmployeeSelectValue = action.payload;
      state.employeeSelectValue = newEmployeeSelectValue;
    },
    modalOpened(state, action) {
      const activeModal = action.payload;
      state.activeModal = activeModal;
    },
    modalClosed(state) {
      state.activeModal = 'none';
    },
  },
});

// selectors
export const selectActiveMonth = (state) => state.appSettings.activeMonth;
export const selectActiveYear = (state) => state.appSettings.activeYear;
export const selectSheetTypeSelectValue = (state) =>
  state.appSettings.sheetTypeSelectValue;
export const selectEmployeeSelectValue = (state) =>
  state.appSettings.employeeSelectValue;
export const selectActiveModal = (state) => state.appSettings.activeModal;

export const selectEmployee = createSelector(
  selectEmployeeSelectValue,
  selectUsers,
  (employeeName, users) => {
    const idList = users.filter(
      (user) => `${user.firstName} ${user.lastName}` === employeeName
    );
    return idList[0];
  }
);

export const {
  monthSelected,
  modalOpened,
  modalClosed,
  sheetTypeSelectValueSelected,
  employeeSelectValueSelected,
  yearSelected,
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
