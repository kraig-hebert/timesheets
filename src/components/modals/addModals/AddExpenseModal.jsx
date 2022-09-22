import React, { useState, useEffect } from 'react';
import * as SX from '../modalSX';
import { saveNewExpense } from '../../../reducers/expensesSlice';
import {
  selectActiveMonth,
  selectActiveYear,
  selectActiveModal,
  modalClosed,
} from '../../../reducers/appSettingsSlice';
import {
  forceDateString,
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
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { useDispatch, useSelector } from 'react-redux';

const AddExpenseModal = () => {
  const dispatch = useDispatch();
  const activeMonth = useSelector(selectActiveMonth);
  const activeYear = useSelector(selectActiveYear);
  const activeModal = useSelector(selectActiveModal);

  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const handleDateChange = (newDate) => setDatePickerValue(newDate);

  const [destinationValue, setDestinationValue] = useState('');
  const handleDestinationChange = (destination) =>
    setDestinationValue(destination);

  const [milesValue, setMilesValue] = useState('');
  const handleMilesChange = (miles) => setMilesValue(miles);

  const updateDateValue = () => {
    const testDate = new Date();
    if (
      MONTHS[testDate.getMonth()] === activeMonth &&
      testDate.getFullYear().toString() === activeYear
    ) {
      testDate.setSeconds(0);
      setDatePickerValue(testDate);
    } else
      setDatePickerValue(
        new Date(parseInt(activeYear), getMonthIndex(activeMonth), 15)
      );
  };

  const clearForm = () => {
    updateDateValue();
    setDestinationValue('');
    setMilesValue('');
  };

  const handleModalClose = () => dispatch(modalClosed('none'));
  const handleAddClick = () => {
    const newExpense = {
      date: forceDateString(datePickerValue),
      destination: destinationValue,
      miles: parseInt(milesValue),
    };
    clearForm();
    handleModalClose();
    dispatch(saveNewExpense(newExpense));
  };

  useEffect(() => {
    updateDateValue();
  }, [activeMonth, activeYear]);

  return (
    <Dialog
      open={activeModal === 'expenses' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      <DialogTitle>Add New Expense</DialogTitle>
      <Divider sx={SX.dividerSX} />
      <DialogContent sx={SX.dialogContentSX}>
        <Stack spacing={1}>
          <DatePicker
            label="Date"
            value={datePickerValue}
            onChange={(newDate) => {
              handleDateChange(newDate);
            }}
            renderInput={(params) => (
              <TextField variant="filled" sx={SX.inputSX} {...params} />
            )}
            sx={SX.inputSX}
          />
          <TextField
            margin="dense"
            id="destination"
            label="Destination"
            placeholder="Enter Destination Name"
            type="text"
            variant="filled"
            onChange={(e) => {
              handleDestinationChange(e.target.value);
            }}
            value={destinationValue}
            sx={SX.inputSX}
          />
          <TextField
            margin="dense"
            id="miles"
            label="Miles"
            placeholder="0"
            type="number"
            variant="filled"
            onChange={(e) => {
              handleMilesChange(e.target.value);
            }}
            value={milesValue}
            sx={SX.inputSX}
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

export default AddExpenseModal;
