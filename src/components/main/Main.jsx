import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  saveNewEntry,
  selectFilteredEntries,
} from '../../reducers/entriesSlice';

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
  let lastStyle = 'type1';

  const dispatch = useDispatch();
  const filteredEntries = useSelector(selectFilteredEntries);

  // set table data
  const createData = (
    id,
    date,
    location,
    comments,
    type,
    startTime,
    endTime,
    rowStyle
  ) => {
    return { id, date, location, comments, type, startTime, endTime, rowStyle };
  };
  const rows = filteredEntries.map((entry, index) => {
    let style = '';

    if (index === 0) {
      style = lastStyle;
    } else {
      console.log(lastStyle);
      if (
        filteredEntries[index - 1].startTime.getDate() ===
        filteredEntries[index].startTime.getDate()
      ) {
        style = lastStyle;
      } else {
        if (lastStyle === 'type1') {
          style = 'type2';
          lastStyle = 'type2';
        } else {
          style = 'type1';
          lastStyle = 'type1';
        }
      }
    }
    return createData(
      entry.id,
      entry.date,
      entry.location,
      entry.comments,
      entry.type,
      entry.startTime,
      entry.endTime,
      style
    );
  });

  // dummy data for testing saveNewEntry()
  const handleAdd = () => {
    const newEntry = {
      id: 7,
      location: 'Holyoke High School',
      comments: 'Nothing Fun',
      type: 'Service',
      startTime: '2022-07-29T12:00:00.788Z',
      endTime: '2022-07-29T18:00:00.788Z',
    };
    dispatch(saveNewEntry(newEntry));
  };

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
              <TableRow key={row.id} sx={SX.tableRowSX(row.rowStyle)}>
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
