import React, { useState } from 'react';
import * as SX from '../../modalSX';
import { useDispatch, useSelector } from 'react-redux';
import EditableExpenses from './EditableExpenses';
import EditableExpense from './EditableExpense';
import {
  editExpense,
  deleteExpense,
  selectEditExpenses,
} from '../../../../reducers/expensesSlice';
import {
  selectActiveModal,
  modalClosed,
} from '../../../../reducers/appSettingsSlice';
import { forceDateString } from '../../../../helpers/dateHelpers';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Stack,
} from '@mui/material';

const EditExpenseModal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const editExpenseList = useSelector(selectEditExpenses);

  const [title, setTitle] = useState('Choose Expense to Edit');
  const [activePage, setActivePage] = useState('page1');
  const [editableExpense, setEditableExpense] = useState();

  const [datePickerValue, setDatePickerValue] = useState(new Date());

  const [destinationValue, setDestinationValue] = useState('');

  const [milesValue, setMilesValue] = useState('');

  const handleExpenseClick = (expense) => {
    setEditableExpense(expense);
    setTitle('Edit Expense');
    setActivePage('page2');
  };

  const handleModalClose = (forceClose = false) => {
    if ((activePage === 'page1') | forceClose) dispatch(modalClosed());
    setActivePage('page1');
    setTitle('Choose Expense to Edit');
  };
  const handleEditClick = () => {
    const editedExpense = {
      id: editableExpense.id,
      date: forceDateString(datePickerValue),
      expense: destinationValue,
      miles: parseFloat(milesValue),
      userId: editableExpense.userId,
    };
    handleModalClose(true);
    dispatch(editExpense(editedExpense));
  };

  const handleDeleteClick = () => {
    handleModalClose(true);
    dispatch(deleteExpense(editableExpense.id));
  };

  return (
    <Dialog
      open={activeModal === 'edit-expenses' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      <DialogTitle>{title}</DialogTitle>
      <Divider sx={SX.dividerSX} />
      <DialogContent sx={SX.dialogContentSX}>
        <Stack spacing={1}>
          {activePage === 'page1' ? (
            <EditableExpenses
              handleExpenseClick={handleExpenseClick}
              editExpenseList={editExpenseList}
            />
          ) : (
            <EditableExpense
              editableExpense={editableExpense}
              datePickerValue={datePickerValue}
              setDatePickerValue={setDatePickerValue}
              destinationValue={destinationValue}
              setDestinationValue={setDestinationValue}
              milesValue={milesValue}
              setMilesValue={setMilesValue}
            />
          )}
        </Stack>
      </DialogContent>
      <Divider sx={SX.dividerSX} />
      <DialogActions>
        <Button variant="outlined" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={handleDeleteClick}
          disabled={activePage === 'page1'}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          onClick={handleEditClick}
          disabled={activePage === 'page1'}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseModal;
