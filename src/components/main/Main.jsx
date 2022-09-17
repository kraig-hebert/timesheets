import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEntries, saveNewEntry } from '../../reducers/entriesSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import * as SX from './mainSX';
import * as dh from '../../helpers/dateHelpers';

const Main = () => {
  const dispatch = useDispatch();
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

  const handleAdd = () => {
    const newEntry = {
      id: 5,
      location: 'Assumption',
      comments: 'Kennedy Front Door',
      type: 'Service',
      startTime: '2022-07-28T12:00:00.788Z',
      endTime: '2022-07-28T18:00:00.788Z',
    };
    dispatch(saveNewEntry(newEntry));
  };

  const setDate = (dateObject) => {
    const monthNum = dateObject.getMonth();
    return `${dh.getMonthName(monthNum)} ${dateObject.getDate()}`;
  };

  const tableRowSX = (id) => {
    // set styling for every other row
    if (id % 2 === 0) {
      return {
        backgroundColor: 'secondary.bg',
        '& .MuiTableCell-root': {
          color: 'white',
        },
      };
    }
    return {
      backgroundColor: 'tertiary.main',
      '& .MuiTableCell-root': {
        color: 'secondary.main',
      },
    };
  };
  return (
    <>
      <TableContainer componant={Paper}>
        <Table size="small" sx={SX.tableSX}>
          <TableHead>
            <TableRow sx={SX.tableHeadSX}>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Total Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={tableRowSX(row.id)}>
                <TableCell>{setDate(row.startTime)}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.comments}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{dh.getTimeString(row.startTime)}</TableCell>
                <TableCell>{dh.getTimeString(row.endTime)}</TableCell>
                <TableCell>
                  {dh.getTotalHours(row.endTime - row.startTime)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
