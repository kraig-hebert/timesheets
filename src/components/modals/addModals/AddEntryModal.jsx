import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewEntry } from '../../../reducers/entriesSlice';
import {
  modalClosed,
  selectActiveMonth,
  selectActiveYear,
  selectActiveModal,
} from '../../../reducers/appSettingsSlice';
import {
  forceDateTimeString,
  getMonthIndex,
  MONTHS,
} from '../../../helpers/dateHelpers';
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
import * as SX from '../modalSX';
import { DateTimePicker } from '@mui/x-date-pickers';

const AddEntryModal = () => {
  const dispatch = useDispatch();
  const activeMonth = useSelector(selectActiveMonth);
  const activeYear = useSelector(selectActiveYear);
  const activeModal = useSelector(selectActiveModal);

  const [locationValue, setLocationValue] = useState('');
  const [commentsValue, setCommentsValue] = useState('');
  const [typeValue, setTypeValue] = useState('Service');
  const [startTimeValue, setStartTimeValue] = useState(new Date());
  const [endTimeValue, setEndTimeValue] = useState(new Date());

  // set date input values once the modal is cleared
  const updateDateValues = () => {
    const testDate = new Date();
    if (
      MONTHS[testDate.getMonth()] === activeMonth &&
      testDate.getFullYear().toString() === activeYear
    ) {
      testDate.setSeconds(0);
      testDate.setMinutes(0);
      testDate.setHours(12);
      setStartTimeValue(testDate);
      setEndTimeValue(testDate);
    } else {
      setStartTimeValue(
        new Date(parseInt(activeYear), getMonthIndex(activeMonth), 15, 12, 0, 0)
      );
      setEndTimeValue(
        new Date(parseInt(activeYear), getMonthIndex(activeMonth), 15, 12, 0, 0)
      );
    }
  };

  const clearForm = () => {
    setLocationValue('');
    setCommentsValue('');
    setTypeValue('Service');
    updateDateValues();
  };

  const handleModalClose = () => dispatch(modalClosed());
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

  useEffect(() => {
    updateDateValues();
  }, [activeMonth, activeYear]);

  return (
    <Dialog
      open={activeModal === 'entries' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      <DialogTitle>Add New Entry</DialogTitle>
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
              setLocationValue(e.target.value);
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
              setCommentsValue(e.target.value);
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
                setTypeValue(e.target.value);
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
              setStartTimeValue(newDate);
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
              setEndTimeValue(newDate);
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
