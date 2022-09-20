import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredExpenses } from '../../../reducers/expensesSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as SX from '../mainSX';

const ExpensesTable = () => {
  const filteredExpenses = useSelector(selectFilteredExpenses);

  const setStyle = (index) => {
    if (index % 2 != 0) return 'type1';
    else return 'type2';
  };

  const createData = (id, destination, miles, date, style) => {
    return { id, destination, miles, date, style };
  };

  const rows = filteredExpenses.map((expense, index) => {
    const style = setStyle(index);
    return createData(
      expense.id,
      expense.destination,
      expense.miles,
      expense.date,
      style
    );
  });
  return (
    <>
      <TableContainer>
        <Table size="small" sx={SX.tableSX}>
          <TableHead>
            <TableRow sx={SX.tableHeadSX}>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Destination</TableCell>
              <TableCell align="center">Miles</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={SX.tableRowSX(row.style)}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.destination}</TableCell>
                <TableCell align="center">{row.miles}</TableCell>
                <TableCell align="center">{row.date.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExpensesTable;
