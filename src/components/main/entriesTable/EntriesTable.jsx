import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredEntries } from '../../../reducers/entriesSlice';
import * as dh from '../../../helpers/dateHelpers';

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
import { EventAvailableSharp } from '@mui/icons-material';

const EntriesTable = () => {
  let lastStyle = 'type2';
  const filteredEntries = useSelector(selectFilteredEntries);

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

  const renderedRowList = rows.map((row) => (
    <TableRow key={row.id} sx={SX.tableRowSX(row.styles.style)}>
      <TableCell align="center" sx={{ width: '10%' }}>
        {row.styles.displayDate && dh.setTableDate(row.startTime)}
      </TableCell>
      <TableCell align="center" sx={{ width: '20%' }}>
        {row.location}
      </TableCell>
      <TableCell align="center" sx={{ width: '20%' }}>
        {row.comments}
      </TableCell>
      <TableCell align="center" sx={{ width: '10%' }}>
        {row.type}
      </TableCell>
      <TableCell align="center" sx={{ width: '15%' }}>
        {dh.getTimeString(row.startTime)}
      </TableCell>
      <TableCell align="center" sx={{ width: '15%' }}>
        {dh.getTimeString(row.endTime)}
      </TableCell>
      <TableCell align="center" sx={{ width: '10%' }}>
        {dh.getTotalHours(row.endTime - row.startTime)}
      </TableCell>
    </TableRow>
  ));

  const RenderRowButton = () => {
    return (
      <TableRow>
        <TableCell sx={SX.emptyTableCellSX} align="center" colSpan={7}>
          <Button variant="contained" startIcon={<EventAvailableSharp />}>
            Add Entry
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
              <TableCell align="center" sx={{ width: '20%' }}>
                Location
              </TableCell>
              <TableCell align="center" sx={{ width: '20%' }}>
                Comments
              </TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>
                Type
              </TableCell>
              <TableCell align="center" sx={{ width: '15%' }}>
                Start Time
              </TableCell>
              <TableCell align="center" sx={{ width: '15%' }}>
                End Time
              </TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>
                Total Hours
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? renderedRowList : <RenderRowButton />}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EntriesTable;
