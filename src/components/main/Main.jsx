import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEntries, saveNewEntry } from '../../reducers/entriesSlice';
import {
  selectActiveMonth,
  selectActiveYear,
} from '../../reducers/appSettingsSlice';
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

const Main = () => {
  const dispatch = useDispatch();
  const entries = useSelector(selectEntries);
  const activeMonth = useSelector(selectActiveMonth);
  const activeYear = useSelector(selectActiveYear);
  const [filteredEntries, setFilteredEntries] = useState([]);

  // set table data
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
  const rows = filteredEntries.map((entry) => {
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

  // dummy data for testing saveNewEntry()
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

  // return date in "Month date" format for table
  const setTableDate = (dateObject) => {
    const monthNum = dateObject.getMonth();
    return `${dh.getMonthName(monthNum)} ${dateObject.getDate()}`;
  };

  useEffect(() => {
    // filter entries by month when activeMonth is updated onClick()
    setFilteredEntries(
      entries.filter((entry) => {
        if (
          dh.MONTHS[entry.startTime.getMonth()] === activeMonth &&
          entry.startTime.getFullYear().toString() === activeYear
        )
          return entry;
      })
    );
  }, [activeMonth]);

  return (
    <>
      <TableContainer>
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
              <TableRow key={row.id} sx={SX.tableRowSX(row.id)}>
                <TableCell>{setTableDate(row.startTime)}</TableCell>
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
