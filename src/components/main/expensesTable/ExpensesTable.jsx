import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  expenseRowClicked,
  selectFilteredExpenses,
} from '../../../reducers/expensesSlice';
import { modalOpened } from '../../../reducers/appSettingsSlice';
import { setTableDate } from '../../../helpers/dateHelpers';
import RowButton from '../rowButton/RowButton';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as SX from '../mainSX';
import { PaidTwoTone } from '@mui/icons-material';

const ExpensesTable = () => {
  const dispatch = useDispatch();
  const filteredExpenses = useSelector(selectFilteredExpenses);

  // table row data constructor
  const createData = (id, date, destination, miles, style) => {
    return {
      id,
      date,
      destination,
      miles,
      style,
    };
  };

  // returns style type changing each turn
  const setStyle = (index) => {
    if (index % 2 != 0) return 'type1';
    else return 'type2';
  };
  const rows = filteredExpenses.map((expense, index) =>
    createData(
      expense.id,
      expense.date,
      expense.destination,
      expense.miles,
      setStyle(index)
    )
  );

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
        {setTableDate(row.date)}
      </TableCell>

      <TableCell align="center" sx={{ widthg: '80%' }}>
        {row.destination}
      </TableCell>
      <TableCell align="center" sx={{ width: '10%' }}>
        {row.miles}
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

              <TableCell align="center" sx={{ width: '80%' }}>
                Destination
              </TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>
                Miles
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderedRowList}
            <RowButton
              colSpan={3}
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
