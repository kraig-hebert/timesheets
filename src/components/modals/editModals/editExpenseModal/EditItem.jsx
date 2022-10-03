import React from 'react';
import { PropTypes } from 'prop-types';
import { inputSX } from '../../modalSX';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const EditItem = (props) => {
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
          <TextField variant="filled" sx={inputSX} {...params} />
        )}
        sx={inputSX}
      />
      <TextField
        margin="dense"
        id="item"
        label="Item"
        placeholder="Enter Item Name"
        type="text"
        variant="filled"
        onChange={(e) => {
          setItemValue(e.target.value);
        }}
        value={itemValue}
        sx={inputSX}
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
        sx={inputSX}
      />
    </>
  );
};

EditItem.propTypes = {
  datePickerValue: PropTypes.object,
  setDatePickerValue: PropTypes.func,
  itemValue: PropTypes.string,
  setItemValue: PropTypes.func,
  costValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCostValue: PropTypes.func,
};

export default EditItem;
