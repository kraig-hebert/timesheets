import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredExpenses } from '../../../reducers/expensesSlice';
import { setTableDate } from '../../../helpers/dateHelpers';
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

  const createData = (id, date, destination, miles, style) => {
    return { id, date, destination, miles, style };
  };

  const rows = filteredExpenses.map((expense, index) => {
    const style = setStyle(index);
    return createData(
      expense.id,
      expense.date,
      expense.destination,
      expense.miles,
      style
    );
  });

  return (
    <>
      <TableContainer>
        <Table size="small" sx={SX.tableSX}>
          <TableHead>
            <TableRow sx={SX.tableHeadSX}>
              <TableCell align="center">Date</TableCell>

              <TableCell align="center">Destination</TableCell>
              <TableCell align="center">Miles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={SX.tableRowSX(row.style)}>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExpensesTable;
