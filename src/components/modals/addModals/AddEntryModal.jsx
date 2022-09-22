import React, { useState } from 'react';
import * as SX from '../modalSX';
import { saveNewEntry } from '../../../reducers/entriesSlice';
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
import { useDispatch, useSelector } from 'react-redux';

const AddEntryModal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);

  const [locationValue, setLocationValue] = useState(' ');
  const handleLocationChange = (location) => setLocationValue(location);

  const [commentsValue, setCommentsValue] = useState(' ');
  const handleCommentsChange = (comments) => setCommentsValue(comments);

  const [typeValue, setTypeValue] = useState('Service');
  const handleTypeChange = (type) => setTypeValue(type);

  const [startTimeValue, setStartTimeValue] = useState(new Date());
  const handleStartTimeChange = (date) => setStartTimeValue(date);

  const [endTimeValue, setEndTimeValue] = useState(new Date());
  const handleEndTimeChange = (date) => setEndTimeValue(date);

  const clearForm = () => {
    setLocationValue(' ');
    setCommentsValue(' ');
    setTypeValue('Service');
    setStartTimeValue(new Date());
    setEndTimeValue(new Date());
  };

  const handleModalClose = () => dispatch(modalClosed('none'));
  const handleAddClick = () => {
    const newEntry = {
      location: locationValue,
      comments: commentsValue,
      type: typeValue,
      startTime: forceDateTimeString(startTimeValue),
      endTime: forceDateTimeString(endTimeValue),
    };
    clearForm();
    handleModalClose();
    dispatch(saveNewEntry(newEntry));
  };
  return (
    <Dialog
      open={activeModal === 'entries' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      <DialogTitle>Add New Entry</DialogTitle>
      <Divider sx={SX.dividerSX} />
      <DialogContent>
        <Stack spacing={1}>
          <TextField
            margin="dense"
            id="location"
            label="Location"
            type="text"
            variant="filled"
            fullWidth
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
            type="text"
            variant="filled"
            fullWidth
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
        <Button variant="outlined" onClick={handleAddClick}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEntryModal;
