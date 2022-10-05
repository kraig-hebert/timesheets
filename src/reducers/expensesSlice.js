import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as client from '../api/client';
import { MONTHS } from '../helpers/dateHelpers';
import { selectEmployee } from './appSettingsSlice';

const initialState = {
  entities: {},
  editMilesExpenseRowDate: [],
  sortEditableBy: 'miles',
  expenseSearchValue: '',
  expenseSearchActive: false,
};

// return next available id
const getID = (expenseList) =>
  expenseList.length ? expenseList[expenseList.length - 1].id + 1 : 1;

// fetch list of timesheet expenses from db.json
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => await client.get('expenses')
);

// save new expense to db.json and update state.entries.entities
export const saveNewExpense = createAsyncThunk(
  'expenses/saveNewExpense',
  async (expense, { getState }) => {
    const state = getState();
    const newExpense = {
      ...expense,
      id: getID(Object.values(state.expenses.entities)),
    };
    const response = await client.post(newExpense, 'expenses');
    if (response.status === 201) return newExpense;
  }
);

// edit expense in db and update state.entries.entities
export const editExpense = createAsyncThunk(
  'expenses/editExpense',
  async (expense) => {
    const response = await client.patch(expense, 'expenses');
    if (response.status === 200) return expense;
  }
);

// delete expense from db and update state.entries.entities
export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id) => {
    const response = await client.remove(id, 'expenses');
    if (response.status === 200) return id;
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    expenseRowClicked(state, action) {
      const sortBy = action.payload;
      state.sortEditableBy = sortBy;
    },
    expenseMilesRowClicked(state, action) {
      const date = action.payload;
      state.editMilesExpenseRowDate = date;
    },
    expenseSearchValueChanged(state, action) {
      const newValue = action.payload;
      state.expenseSearchValue = newValue;
    },
    expenseSearchToggled(state) {
      state.expenseSearchActive = !state.expenseSearchActive;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        const newExpenses = {};
        action.payload.forEach((expense) => {
          newExpenses[expense.id] = expense;
        });
        state.entities = newExpenses;
      })
      .addCase(saveNewExpense.fulfilled, (state, action) => {
        const expense = action.payload;
        state.entities[expense.id] = expense;
      })
      .addCase(editExpense.fulfilled, (state, action) => {
        const expense = action.payload;
        state.entities[expense.id] = expense;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        const id = action.payload;
        const newExpenses = {};
        Object.values(state.entities).forEach((expense) => {
          if (id != expense.id) newExpenses[expense.id] = expense;
        });
        state.entities = newExpenses;
      });
  },
});

export const {
  expenseRowClicked,
  expenseMilesRowClicked,
  expenseSearchValueChanged,
  expenseSearchToggled,
} = expensesSlice.actions;

// selectors
export const selectExpenseEntities = (state) => state.expenses.entities;
export const selectSortEditableBy = (state) => state.expenses.sortEditableBy;
export const selectMilesEditExpenseRowDate = (state) =>
  state.expenses.editMilesExpenseRowDate;
export const selectExpenseSearchValue = (state) =>
  state.expenses.expenseSearchValue;
export const selectExpenseSearchActive = (state) =>
  state.expenses.expenseSearchActive;

// selectors from appSettingsSlice
const selectActiveMonth = (state) => state.appSettings.activeMonth;
const selectActiveYear = (state) => state.appSettings.activeYear;

// select expenses with the dateObjects instead of JSON strings
export const selectExpenses = createSelector(
  selectExpenseEntities,
  (expenses) => {
    const expenseList = Object.values(expenses);

    const sortedExpenseListWithDateObjects = expenseList
      .map((expense) => {
        return {
          ...expense,
          date: new Date(expense.date),
        };
      })
      .sort((expenseA, expenseB) => expenseA.date - expenseB.date);
    return sortedExpenseListWithDateObjects;
  }
);

// select lkist of expenses for edit
export const selectEditExpenses = createSelector(
  selectSortEditableBy,
  selectMilesEditExpenseRowDate,
  selectExpenses,
  selectEmployee,
  (sortBy, date, expenses, employee) => {
    // skips error when no employee exists on initial page load
    if (!employee) return [];
    let editExpenseList;
    if (sortBy === 'cost') {
      editExpenseList = expenses.filter(
        (expense) =>
          expense.hasOwnProperty('cost') &&
          expense.date.getMonth() === new Date(date).getMonth()
      );
    } else {
      editExpenseList = expenses.filter(
        (expense) =>
          expense.date.toJSON() === date &&
          expense.userId === employee.id &&
          !expense.hasOwnProperty('cost')
      );
    }

    return editExpenseList;
  }
);

// select expenses filtered by month and year and employee
export const selectFilteredExpenses = createSelector(
  selectActiveMonth,
  selectActiveYear,
  selectEmployee,
  selectExpenses,
  (activeMonth, activeYear, employee, expenses) => {
    // skips error when no employee exists on initial page load
    if (!employee) return [];

    const filteredExpenses = expenses.filter(
      (expense) =>
        MONTHS[expense.date.getMonth()] === activeMonth &&
        expense.date.getFullYear().toString() === activeYear &&
        expense.userId === employee.id
    );
    return filteredExpenses;
  }
);

// select filtered expenses and than filter again by search bar criteria
export const selectFilteredSearchExpenses = createSelector(
  selectFilteredExpenses,
  selectExpenseSearchValue,
  selectExpenseSearchActive,
  (expenses, searchValue, isActive) => {
    if (isActive) {
      return expenses.filter((expense) =>
        expense.expense.includes(searchValue)
      );
    }
  }
);

export default expensesSlice.reducer;
