import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as client from '../api/client';
import { MONTHS } from '../helpers/dateHelpers';

const initialState = { entities: {} };

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => {
    const response = await client.get('expenses');
    return response;
  }
);

const getID = (expenseList) => {
  const id = expenseList.length
    ? expenseList[expenseList.length - 1].id + 1
    : 1;

  return id;
};

export const saveNewExpense = createAsyncThunk(
  'expenses/saveNewExpense',
  async (expense, { getState }) => {
    const state = getState();
    const newExpense = {
      ...expense,
      id: getID(Object.values(state.expenses.entities)),
    };
    const response = await client.post(newExpense, 'expenses');
    if (response.status === 201) {
      return newExpense;
    }
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
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
      });
  },
});

// select all expense entities
export const selectExpenseEntities = (state) => state.expenses.entities;

// select activeMonth from appSettings
const selectActiveMonth = (state) => state.appSettings.activeMonth;
// select activeYear from appSettings
const selectActiveYear = (state) => state.appSettings.activeYear;

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
