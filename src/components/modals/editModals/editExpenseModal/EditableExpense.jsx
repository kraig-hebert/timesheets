import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { inputSX } from '../../modalSX';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const EditableExpense = (props) => {
  const { editableExpense } = props;
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const handleDateChange = (newDate) => setDatePickerValue(newDate);

  const [destinationValue, setDestinationValue] = useState('');
  const handleDestinationChange = (destination) =>
    setDestinationValue(destination);

  const [milesValue, setMilesValue] = useState('');
  const handleMilesChange = (miles) => setMilesValue(miles);

  useEffect(() => {
    setDatePickerValue(editableExpense.date);
    setDestinationValue(editableExpense.destination);
    setMilesValue(editableExpense.miles);
  }, [editableExpense]);

  return (
    <>
      <DatePicker
        label="Date"
        value={datePickerValue}
        onChange={(newDate) => {
          handleDateChange(newDate);
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
          handleDestinationChange(e.target.value);
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
          handleMilesChange(e.target.value);
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
