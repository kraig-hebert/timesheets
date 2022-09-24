import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as client from '../api/client';
import { MONTHS } from '../helpers/dateHelpers';

const initialState = { entities: {}, editExpenseRowDate: [] };

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
      const date = action.payload;
      state.editExpenseRowDate = date;
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
        state.entities = Object.values(state.entities).filter(
          (expense) => expense.id != id
        );
      });
  },
});

export const { expenseRowClicked } = expensesSlice.actions;

// selectors
export const selectExpenseEntities = (state) => state.expenses.entities;
export const selectEditExpenseRowDate = (state) =>
  state.expenses.editExpenseRowDate;

// selectrors from appSettingsSlice
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
  selectEditExpenseRowDate,
  selectExpenses,
  (date, expenses) => {
    const editExpenseList = expenses.filter(
      (expense) => expense.date.toJSON() === date
    );
    return editExpenseList;
  }
);

// select expenses filtered by month and year
// expeneses with the same date will be combined into 1 expense
// disdplay as: "destination / destination" and miles are added together
export const selectFilteredExpenses = createSelector(
  selectActiveMonth,
  selectActiveYear,
  selectExpenses,
  (activeMonth, activeYear, expenses) => {
    let tempDict = {};

    const filteredExpenses = expenses.filter(
      (expense) =>
        MONTHS[expense.date.getMonth()] === activeMonth &&
        expense.date.getFullYear().toString() === activeYear
    );

    // combine expenses by date
    filteredExpenses.forEach((expense, index) => {
      if (index === 0) tempDict[expense.date] = expense;
      else if (Object.keys(tempDict).includes(expense.date.toString())) {
        tempDict[expense.date.toString()] = {
          ...tempDict[expense.date],
          destination: `${tempDict[expense.date.toString()].destination} / ${
            expense.destination
          }`,
          miles: tempDict[expense.date.toString()].miles + expense.miles,
        };
      } else tempDict[expense.date] = expense;
    });
    return Object.values(tempDict);
  }
);

export default expensesSlice.reducer;
