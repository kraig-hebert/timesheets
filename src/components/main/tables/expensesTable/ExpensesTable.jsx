import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  expenseRowClicked,
  selectFilteredExpenses,
} from '../../../../reducers/expensesSlice';
import { modalOpened } from '../../../../reducers/appSettingsSlice';
import { setTableDate } from '../../../../helpers/dateHelpers';
import RowButton from '../rowButton/RowButton';

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

  // table row data constructor
  const createData = (id, date, expense, miles, cost, style) => {
    return {
      id,
      date,
      expense,
      miles,
      cost,
      style,
    };
  };

  // returns style type changing each turn
  const setStyle = (index) => {
    if (index % 2 != 0) return 'type1';
    else return 'type2';
  };
  const setCost = (miles) => parseFloat(miles * 0.7).toFixed(2);
  const rows = filteredExpenses.map((expense, index) => {
    if (!expense.miles) {
      return createData(
        expense.id,
        expense.date,
        expense.expense,
        '',
        parseFloat(expense.cost).toFixed(2),
        setStyle(index)
      );
    } else {
      return createData(
        expense.id,
        expense.date,
        expense.expense,
        expense.miles,
        setCost(expense.miles),
        setStyle(index)
      );
    }
  });

  const handleRowClick = (date) => {
    dispatch(modalOpened('edit-expenses'));
    dispatch(expenseRowClicked(date.toJSON()));
  };

  const renderedRowList = rows.map((row) => (
    <TableRow
      key={row.id}
      sx={SX.tableRowSX(row.style)}
      onClick={() => handleRowClick(row.date)}
    >
      <TableCell align="center" sx={{ width: '10%' }}>
        {row.date && setTableDate(row.date)}
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
