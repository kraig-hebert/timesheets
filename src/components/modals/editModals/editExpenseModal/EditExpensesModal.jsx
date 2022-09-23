import React, { useState, useEffect } from 'react';
import * as SX from '../../modalSX';
import { useDispatch, useSelector } from 'react-redux';
import EditableExpenses from './EditableExpenses';
import EditableExpense from './EditableExpense';
import {
  selectEditExpenses,
  editExpense,
  deleteExpense,
} from '../../../../reducers/expensesSlice';
import {
  selectActiveModal,
  modalClosed,
} from '../../../../reducers/appSettingsSlice';

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

  const [title, setTitle] = useState('Choose Expense to Edit');
  const [activePage, setActivePage] = useState('page1');
  const [editableExpense, setEditableExpense] = useState();

  const handleExpenseClick = (expense) => {
    setEditableExpense(expense);
    setTitle('Edit Expense');
    setActivePage('page2');
  };

  const handleModalClose = (forceClose = false) => {
    if ((activePage === 'page1') | forceClose) dispatch(modalClosed('none'));
    setActivePage('page1');
    setTitle('Choose Expense to Edit');
  };
  const handleEditClick = () => {
    console.log('edit');
    handleModalClose(true);
  };
  const handleDeleteClick = () => {
    console.log('delete');
    handleModalClose(true);
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
            <EditableExpenses handleExpenseClick={handleExpenseClick} />
          ) : (
            <EditableExpense editableExpense={editableExpense} />
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
