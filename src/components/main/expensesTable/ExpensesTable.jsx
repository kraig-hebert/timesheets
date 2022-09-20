import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredExpenses } from '../../../reducers/expensesSlice';
import {
  selectActiveModal,
  modalOpened,
} from '../../../reducers/appSettingsSlice';
import { setTableDate } from '../../../helpers/dateHelpers';
import {
  Button,
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

  const renderedRowList = rows.map((row) => (
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
  ));

  const RenderButtonRow = () => {
    return (
      <TableRow>
        <TableCell sx={SX.emptyTableCellSX} align="center" colSpan={3}>
          <Button
            variant="contained"
            startIcon={<PaidTwoTone />}
            onClick={() => dispatch(modalOpened('expenses'))}
          >
            Add Expense
          </Button>
        </TableCell>
      </TableRow>
    );
  };

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
            {rows.length ? renderedRowList : <RenderButtonRow />}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExpensesTable;
