import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as client from '../api/client';
import { MONTHS } from '../helpers/dateHelpers';
import { selectEmployee } from './appSettingsSlice';

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
        const newExpenses = {};
        Object.values(state.entities).forEach((expense) => {
          if (id != expense.id) newExpenses[expense.id] = expense;
        });
        state.entities = newExpenses;
      });
  },
});

export const { expenseRowClicked } = expensesSlice.actions;

// selectors
export const selectExpenseEntities = (state) => state.expenses.entities;
export const selectEditExpenseRowDate = (state) =>
  state.expenses.editExpenseRowDate;

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
  selectEditExpenseRowDate,
  selectExpenses,
  selectEmployee,
  (date, expenses, employee) => {
    // skips error when no employee exists on initial page load
    if (!employee) return [];

    const editExpenseList = expenses.filter(
      (expense) =>
        expense.date.toJSON() === date && expense.userId === employee.id
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
  selectEmployee,
  selectExpenses,
  (activeMonth, activeYear, employee, expenses) => {
    // skips error when no employee exists on initial page load
    if (!employee) return [];

    let tempDict = {};
    if (employee.hasCellPhone) {
      const newExpense = {
        id: 0,
        expense: 'Cell Phone',
        cost: 50.0,
      };
      tempDict['0'] = newExpense;
    }

    const filteredExpenses = expenses.filter(
      (expense) =>
        MONTHS[expense.date.getMonth()] === activeMonth &&
        expense.date.getFullYear().toString() === activeYear &&
        expense.userId === employee.id
    );

    // combine expenses by date and separate item expenses from miles expenses
    // set item expenses to tempDict[1] so they show up before all of the miles expenses
    filteredExpenses.forEach((expense, index) => {
      if (expense.hasOwnProperty('cost')) {
        if (Object.keys(tempDict).includes('1')) {
          tempDict[1] = {
            ...tempDict[1],
            expense: `${tempDict[1].expense} / ${expense.expense}`,
            cost: tempDict[1].cost + expense.cost,
          };
        } else tempDict[1] = expense;
      } else if (Object.keys(tempDict).includes(expense.date.toString())) {
        tempDict[expense.date.toString()] = {
          ...tempDict[expense.date],
          expense: `${tempDict[expense.date.toString()].expense} / ${
            expense.expense
          }`,
          miles: tempDict[expense.date.toString()].miles + expense.miles,
        };
      } else tempDict[expense.date] = expense;
    });
    return Object.values(tempDict);
  }
);

export default expensesSlice.reducer;
