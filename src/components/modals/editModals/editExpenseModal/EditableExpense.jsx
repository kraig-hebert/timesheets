import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { inputSX } from '../../modalSX';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const EditableExpense = (props) => {
  const {
    editableExpense,
    datePickerValue,
    setDatePickerValue,
    destinationValue,
    setDestinationValue,
    milesValue,
    setMilesValue,
  } = props;

  useEffect(() => {
    setDatePickerValue(editableExpense.date);
    setDestinationValue(editableExpense.expense);
    setMilesValue(editableExpense.miles);
  }, [editableExpense]);

  return (
    <>
      <DatePicker
        label="Date"
        value={datePickerValue}
        onChange={(newDate) => {
          setDatePickerValue(newDate);
        }}
        renderInput={(params) => (
          <TextField variant="filled" sx={inputSX} {...params} />
        )}
        sx={inputSX}
      />
      <TextField
        margin="dense"
        id="destination"
        label="Destination"
        placeholder="Enter Destination Name"
        type="text"
        variant="filled"
        onChange={(e) => {
          setDestinationValue(e.target.value);
        }}
        value={destinationValue}
        sx={inputSX}
      />
      <TextField
        margin="dense"
        id="miles"
        label="Miles"
        placeholder="0"
        type="number"
        variant="filled"
        onChange={(e) => {
          setMilesValue(e.target.value);
        }}
        value={milesValue}
        sx={inputSX}
      />
    </>
  );
};

EditableExpense.propTypes = {
  expense: PropTypes.object,
};

export default EditableExpense;
