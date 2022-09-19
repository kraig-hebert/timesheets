import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredEntries } from '../../reducers/entriesSlice';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import * as SX from './mainSX';
import * as dh from '../../helpers/dateHelpers';
import {
  fetchExpenses,
  selectFilteredExpenses,
} from '../../reducers/expensesSlice';

const Main = () => {
  let lastStyle = 'type2';

  const dispatch = useDispatch();
  const filteredEntries = useSelector(selectFilteredEntries);
  const filteredExpenses = useSelector(selectFilteredExpenses);

  const setStyle = (index) => {
    if (index === 0) return { style: lastStyle, displayDate: true };
    else {
      if (
        filteredEntries[index - 1].startTime.getDate() ===
        filteredEntries[index].startTime.getDate()
      )
        return { style: lastStyle, displayDate: false };
      else {
        if (lastStyle === 'type1') {
          lastStyle = 'type2';
          return { style: 'type2', displayDate: true };
        } else {
          lastStyle = 'type1';
          return { style: 'type1', displayDate: true };
        }
      }
    }
  };

  // set table data
  const createData = (
    id,
    date,
    location,
    comments,
    type,
    startTime,
    endTime,
    styles
  ) => {
    return {
      id,
      date,
      location,
      comments,
      type,
      startTime,
      endTime,
      styles,
    };
  };
  const rows = filteredEntries.map((entry, index) => {
    const styles = setStyle(index);

    return createData(
      entry.id,
      entry.date,
      entry.location,
      entry.comments,
      entry.type,
      entry.startTime,
      entry.endTime,
      styles
    );
  });

  // dummy data for testing saveNewExpense()
  const handleAdd = () => {};

  // return date in "Month date" format for table
  const setTableDate = (dateObject) => {
    const monthNum = dateObject.getMonth();
    return `${dh.getMonthName(monthNum)} ${dateObject.getDate()}`;
  };

  return (
    <>
      <TableContainer>
        <Table size="small" sx={SX.tableSX}>
          <TableHead>
            <TableRow sx={SX.tableHeadSX}>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Comments</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">Total Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={SX.tableRowSX(row.styles.style)}>
                <TableCell align="center">
                  {row.styles.displayDate && setTableDate(row.startTime)}
                </TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">{row.comments}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">
                  {dh.getTimeString(row.startTime)}
                </TableCell>
                <TableCell align="center">
                  {dh.getTimeString(row.endTime)}
                </TableCell>
                <TableCell align="center">
                  {dh.getTotalHours(row.endTime - row.startTime)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* temp button to test saveNewEntry() */}
      <Button
        variant="outlined"
        onClick={() => {
          handleAdd();
        }}
      >
        AddEntry
      </Button>
    </>
  );
};

export default Main;
