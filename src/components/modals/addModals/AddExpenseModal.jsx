import React, { useState } from 'react';
import * as SX from '../modalSX';
import { saveNewExpense } from '../../../reducers/expensesSlice';
import {
  selectActiveModal,
  modalClosed,
} from '../../../reducers/appSettingsSlice';
import { forceDateString } from '../../../helpers/dateHelpers';

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
  const activeModal = useSelector(selectActiveModal);

  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const handleDateChange = (newDate) => setDatePickerValue(newDate);

  const [destinationValue, setDestinationValue] = useState('');
  const handleDestinationChange = (destination) =>
    setDestinationValue(destination);

  const [milesValue, setMilesValue] = useState(0);
  const handleMilesChange = (miles) => setMilesValue(miles);

  const clearForm = () => {
    setDatePickerValue(new Date());
    setDestinationValue('');
    setMilesValue(0);
  };

  const handleModalClose = () => dispatch(modalClosed('none'));
  const handleAddClick = () => {
    const newExpense = {
      date: forceDateString(datePickerValue),
      destination: destinationValue,
      miles: parseInt(milesValue),
    };
    clearForm();
    dispatch(modalClosed());
    dispatch(saveNewExpense(newExpense));
  };

  return (
    <Dialog
      open={activeModal === 'expenses' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      <DialogTitle>Add New Expense</DialogTitle>
      <Divider sx={SX.dividerSX} />
      <DialogContent>
        <Stack spacing={1}>
          <DatePicker
            label="Date"
            value={datePickerValue}
            onChange={(newDate) => {
              handleDateChange(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            autoFocus
            margin="dense"
            id="destination"
            label="Destination"
            type="text"
            fullWidth
            onChange={(e) => {
              handleDestinationChange(e.target.value);
            }}
            value={destinationValue}
          />
          <TextField
            autoFocus
            margin="dense"
            id="miles"
            label="Miles"
            type="number"
            fullWidth
            onChange={(e) => {
              handleMilesChange(e.target.value);
            }}
            value={milesValue}
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
