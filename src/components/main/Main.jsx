import React from 'react';
import { useSelector } from 'react-redux';
import { selectEntries } from '../../reducers/entriesSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import * as SX from './mainSX';
import { getMonthName } from '../../helpers/dateHelpers';

const Main = () => {
  const entries = useSelector(selectEntries);
  const createData = (
    id,
    date,
    location,
    comments,
    type,
    startTime,
    endTime
  ) => {
    return { id, date, location, comments, type, startTime, endTime };
  };
  const rows = entries.map((entry) => {
    return createData(
      entry.id,
      entry.date,
      entry.location,
      entry.comments,
      entry.type,
      entry.startTime,
      entry.endTime
    );
  });

  const setDate = (dateObject) => {
    const monthNum = dateObject.getMonth();
    return `${getMonthName(monthNum)} ${dateObject.getDate()}`;
  };

  const tableRowSX = (id) => {
    if (id % 2 === 0) {
      return {
        backgroundColor: 'primary.main',
      };
    }
    return { '& .MuiTableCell-root': { color: 'secondary.main' } };
  };
  return (
    <TableContainer componant={Paper} sx={SX.tableContainerSX}>
      <Table size="small" sx={SX.tableSX}>
        <TableHead>
          <TableRow sx={SX.tableHeadSX}>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={[SX.tableRowSX, tableRowSX(row.id)]}>
              <TableCell>{setDate(row.startTime)}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.comments}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.startTime.toDateString()}</TableCell>
              <TableCell>{row.endTime.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Main;
