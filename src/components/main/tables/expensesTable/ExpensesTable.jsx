import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  expenseMilesRowClicked,
  expenseRowClicked,
  selectFilteredExpenses,
  selectFilteredSearchExpenses,
  selectExpenseSearchActive,
} from '../../../../reducers/expensesSlice';
import {
  modalOpened,
  selectEmployee,
} from '../../../../reducers/appSettingsSlice';
import { setTableDate } from '../../../../helpers/dateHelpers';
import RowButton from '../../rowButton/RowButton';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as SX from '../../mainSX';
import { PaidTwoTone } from '@mui/icons-material';

const ExpensesTable = () => {
  const dispatch = useDispatch();
  const filteredExpenses = useSelector(selectFilteredExpenses);
  const employee = useSelector(selectEmployee);
  const expenseSearchActive = useSelector(selectExpenseSearchActive);
  const filteredSearchExpenses = useSelector(selectFilteredSearchExpenses);
  const [expenses, setExpenses] = useState([]);

  const handleRowClick = (date, sortBy) => {
    dispatch(modalOpened('edit-expenses'));
    dispatch(expenseMilesRowClicked(date.toJSON()));
    dispatch(expenseRowClicked(sortBy));
  };

  // table row data constructor
  const createData = (id, date, expense, miles, cost, style, sortBy) => {
    return {
      id,
      date,
      expense,
      miles,
      cost,
      style,
      sortBy,
    };
  };

  // returns style type changing each turn
  const setStyle = (index) => {
    if (index % 2 != 0) return 'type1';
    else return 'type2';
  };
  const setCost = (miles) => parseFloat(miles * 0.7).toFixed(2);
  const rows = expenses.map((expense, index) => {
    if (!expense.miles) {
      return createData(
        expense.id,
        expense.date,
        expense.expense,
        '',
        parseFloat(expense.cost).toFixed(2),
        setStyle(index),
        'cost'
      );
    } else {
      return createData(
        expense.id,
        expense.date,
        expense.expense,
        expense.miles,
        setCost(expense.miles),
        setStyle(index),
        'miles'
      );
    }
  });

  const renderedRowList = rows.map((row) => (
    <TableRow
      key={row.id}
      sx={SX.tableRowSX(row.style)}
      onClick={() => handleRowClick(row.date, row.sortBy)}
    >
      <TableCell align="center" sx={{ width: '10%' }}>
        {row.date && row.miles !== '' && setTableDate(row.date)}
      </TableCell>
      <TableCell align="center" sx={{ widthg: '70%' }}>
        {row.expense}
      </TableCell>
      <TableCell align="center" sx={{ width: '10%' }}>
        {row.miles}
      </TableCell>
      <TableCell align="center" sx={{ width: '10%' }}>
        {`$ ${row.cost}`}
      </TableCell>
    </TableRow>
  ));

  useEffect(() => {
    let tempDict = {};

    if (expenseSearchActive) setExpenses(filteredSearchExpenses);
    else {
      if (employee.hasCellPhone) {
        const newExpense = {
          id: 0,
          expense: 'Cell Phone',
          cost: 50.0,
        };
        tempDict['0'] = newExpense;
      }
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

      setExpenses(Object.values(tempDict));
    }
  }, [filteredExpenses, expenseSearchActive]);

  return (
    <>
      <TableContainer>
        <Table size="small" sx={SX.tableSX}>
          <TableHead>
            <TableRow sx={SX.tableHeadSX}>
              <TableCell align="center" sx={{ width: '10%' }}>
                Date
              </TableCell>

              <TableCell align="center" sx={{ width: '70%' }}>
                Expense
              </TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>
                Miles
              </TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>
                Cost
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderedRowList}
            <RowButton
              colSpan={4}
              icon={<PaidTwoTone />}
              buttonType="expenses"
              buttonText="Add Expense"
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExpensesTable;
