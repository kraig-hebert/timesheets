import React from 'react';
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import * as SX from '../../modalSX';

const AddMilesExpense = (props) => {
  const {
    datePickerValue,
    setDatePickerValue,
    destinationValue,
    setDestinationValue,
    milesValue,
    setMilesValue,
  } = props;
  return (
    <>
      <DatePicker
        label="Date"
        value={datePickerValue}
        onChange={(newDate) => {
          setDatePickerValue(newDate);
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
          setDestinationValue(e.target.value);
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
          setMilesValue(e.target.value);
        }}
        value={milesValue}
        sx={SX.inputSX}
      />
    </>
  );
};

export default AddMilesExpense;
