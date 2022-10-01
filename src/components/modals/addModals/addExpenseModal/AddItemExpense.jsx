import React from 'react';
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import * as SX from '../../modalSX';

const AddItemExpense = (props) => {
  const {
    datePickerValue,
    setDatePickerValue,
    itemValue,
    setItemValue,
    costValue,
    setCostValue,
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
        id="item"
        label="Item"
        placeholder="Enter Item"
        type="text"
        variant="filled"
        onChange={(e) => {
          setItemValue(e.target.value);
        }}
        value={itemValue}
        sx={SX.inputSX}
      />
      <TextField
        margin="dense"
        id="cost"
        label="Cost"
        placeholder="0"
        type="number"
        variant="filled"
        onChange={(e) => {
          setCostValue(e.target.value);
        }}
        value={costValue}
        sx={SX.inputSX}
      />
    </>
  );
};

export default AddItemExpense;
