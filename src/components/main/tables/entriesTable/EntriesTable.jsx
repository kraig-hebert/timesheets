import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  entryRowClicked,
  selectFilteredEntries,
  selectFilteredSearchEntries,
  selectEntrySearchActive,
} from '../../../../reducers/entriesSlice';
import { modalOpened } from '../../../../reducers/appSettingsSlice';
import * as dh from '../../../../helpers/dateHelpers';
import RowButton from '../../rowButton/RowButton';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as SX from '../../mainSX';
import { EventAvailableTwoTone } from '@mui/icons-material';

const EntriesTable = () => {
  const dispatch = useDispatch();
  let lastStyle = 'type2';
  const filteredEntries = useSelector(selectFilteredEntries);
  const entrySearchActive = useSelector(selectEntrySearchActive);
  const filteredSearchEntries = useSelector(selectFilteredSearchEntries);
  const [entries, setEntries] = useState([]);

  // table row data constructor
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

  //returns style type only changing if the date changes
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
  const rows = entries.map((entry, index) =>
    createData(
      entry.id,
      entry.date,
      entry.location,
      entry.comments,
      entry.type,
      entry.startTime,
      entry.endTime,
      setStyle(index)
    )
  );

  const handleRowClick = (id) => {
    dispatch(modalOpened('edit-entries'));
    dispatch(entryRowClicked(id));
  };

  const renderedRowList = rows.map((row) => (
    <TableRow
      key={row.id}
      sx={SX.tableRowSX(row.styles.style)}
      onClick={() => handleRowClick(row.id)}
    >
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

  useEffect(() => {
    if (entrySearchActive) setEntries(filteredSearchEntries);
    else setEntries(filteredEntries);
  }, [filteredEntries, entrySearchActive]);

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
            {renderedRowList}
            <RowButton
              colSpan={7}
              icon={<EventAvailableTwoTone />}
              buttonType="entries"
              buttonText="Add Entry"
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EntriesTable;
