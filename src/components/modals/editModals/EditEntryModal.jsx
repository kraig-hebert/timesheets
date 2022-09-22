import React, { useState, useEffect } from 'react';
import * as SX from '../modalSX';
import { useDispatch, useSelector } from 'react-redux';

import { selectEditEntry } from '../../../reducers/entriesSlice';
import {
  selectActiveModal,
  modalClosed,
} from '../../../reducers/appSettingsSlice';

import { forceDateTimeString } from '../../../helpers/dateHelpers';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

const EditEntryModal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const editEntry = useSelector(selectEditEntry);

  const [locationValue, setLocationValue] = useState('');
  const handleLocationChange = (location) => setLocationValue(location);

  const [commentsValue, setCommentsValue] = useState('');
  const handleCommentsChange = (comments) => setCommentsValue(comments);

  const [typeValue, setTypeValue] = useState('Service');
  const handleTypeChange = (type) => setTypeValue(type);

  const [startTimeValue, setStartTimeValue] = useState(new Date());
  const handleStartTimeChange = (date) => setStartTimeValue(date);

  const [endTimeValue, setEndTimeValue] = useState(new Date());
  const handleEndTimeChange = (date) => setEndTimeValue(date);

  const handleModalClose = () => dispatch(modalClosed('none'));
  const handleEditClick = () => {};
  const handleDeleteClick = () => {};

  useEffect(() => {
    if (editEntry != undefined) {
      setLocationValue(editEntry.location);
      setCommentsValue(editEntry.comments);
      setTypeValue(editEntry.type);
      setStartTimeValue(editEntry.startTime);
      setEndTimeValue(editEntry.endTime);
    }
  }, [editEntry]);
  return (
    <Dialog
      open={activeModal === 'edit-entries' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      {' '}
      <DialogTitle>Edit/Delete Entry</DialogTitle>
      <Divider sx={SX.dividerSX} />
      <DialogContent sx={SX.dialogContentSX}>
        <Stack spacing={1}>
          <TextField
            margin="dense"
            id="location"
            label="Location"
            placeholder="Enter a Location"
            type="text"
            variant="filled"
            onChange={(e) => {
              handleLocationChange(e.target.value);
            }}
            value={locationValue}
            sx={SX.inputSX}
          />
          <TextField
            margin="dense"
            id="comments"
            label="Comments"
            placeholder="Enter Quick Comments"
            type="text"
            variant="filled"
            onChange={(e) => {
              handleCommentsChange(e.target.value);
            }}
            value={commentsValue}
            sx={SX.inputSX}
          />
          <FormControl>
            <InputLabel id="typeID" sx={SX.labelSX}>
              Sheet Type
            </InputLabel>

            <Select
              labelId="typeID"
              id="type"
              variant="outlined"
              value={typeValue}
              label="Sheet Type"
              onChange={(e) => {
                handleTypeChange(e.target.value);
              }}
              sx={SX.selectSX}
            >
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Startup">Startup</MenuItem>
              <MenuItem value="Meeting">Meeting</MenuItem>
              <MenuItem value="Testing">Testing</MenuItem>
            </Select>
          </FormControl>
          <DateTimePicker
            label="Start Date"
            value={startTimeValue}
            onChange={(newDate) => {
              handleStartTimeChange(newDate);
            }}
            sx={SX.inputSX}
            renderInput={(params) => (
              <TextField variant="filled" sx={SX.inputSX} {...params} />
            )}
          />
          <DateTimePicker
            label="End Date"
            value={endTimeValue}
            onChange={(newDate) => {
              handleEndTimeChange(newDate);
            }}
            sx={SX.inputSX}
            renderInput={(params) => (
              <TextField variant="filled" sx={SX.inputSX} {...params} />
            )}
          />
        </Stack>
      </DialogContent>
      <Divider sx={SX.dividerSX} />
      <DialogActions>
        <Button variant="outlined" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleDeleteClick}>
          Delete
        </Button>
        <Button variant="outlined" onClick={handleEditClick}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEntryModal;
