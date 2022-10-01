import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewExpense } from '../../../../reducers/expensesSlice';
import {
  modalClosed,
  selectActiveMonth,
  selectActiveYear,
  selectActiveModal,
  selectEmployee,
} from '../../../../reducers/appSettingsSlice';
import {
  forceDateString,
  getMonthIndex,
  MONTHS,
} from '../../../../helpers/dateHelpers';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import * as SX from '../../modalSX';
import { DatePicker } from '@mui/x-date-pickers';
import AddMilesExpense from './AddMilesExpense';
import AddItemExpense from './AddItemExpense';

const AddExpenseModal = () => {
  const dispatch = useDispatch();
  const activeMonth = useSelector(selectActiveMonth);
  const activeYear = useSelector(selectActiveYear);
  const activeModal = useSelector(selectActiveModal);
  const employee = useSelector(selectEmployee);

  const [switchChecked, setSwitchChecked] = useState(false);
  const handleSwitchChange = (e) => setSwitchChecked(e.target.checked);

  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [destinationValue, setDestinationValue] = useState('');
  const [milesValue, setMilesValue] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [costValue, setCostValue] = useState('');

  // set date input values once the modal is cleared
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
    setItemValue('');
    setCostValue('');
  };

  const handleModalClose = () => dispatch(modalClosed());
  const handleAddClick = () => {
    let newExpense = {};
    if (!switchChecked)
      newExpense = {
        date: forceDateString(datePickerValue),
        expense: destinationValue,
        miles: parseInt(milesValue),
        userId: employee.id,
      };
    else {
      const cost = parseFloat(costValue).toFixed(2);
      const num = parseFloat(cost);
      newExpense = {
        date: forceDateString(datePickerValue),
        expense: itemValue,
        cost: num,
        userId: employee.id,
      };
    }

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
      <DialogTitle sx={SX.dialogTitleSX}>
        Add New Expense
        <Stack direction="row">
          <Typography variant="h7">Miles</Typography>
          <Switch
            checked={switchChecked}
            onChange={(e) => {
              handleSwitchChange(e);
            }}
          />
          <Typography variant="h7">Item</Typography>
        </Stack>
      </DialogTitle>
      <Divider sx={SX.dividerSX} />
      <DialogContent sx={SX.dialogContentSX}>
        <Stack spacing={1}>
          {!switchChecked ? (
            <AddMilesExpense
              datePickerValue={datePickerValue}
              setDatePickerValue={setDatePickerValue}
              destinationValue={destinationValue}
              setDestinationValue={setDestinationValue}
              milesValue={milesValue}
              setMilesValue={setMilesValue}
            />
          ) : (
            <AddItemExpense
              datePickerValue={datePickerValue}
              setDatePickerValue={setDatePickerValue}
              itemValue={itemValue}
              setItemValue={setItemValue}
              costValue={costValue}
              setCostValue={setCostValue}
            />
          )}
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
