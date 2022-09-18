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
      state.year = action.payload;
    },
  },
});

export default appSettingsSlice.reducer;
