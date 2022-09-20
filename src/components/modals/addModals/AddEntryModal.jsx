import React from 'react';
import * as SX from '../modalSX';
import {
  selectActiveModal,
  modalClosed,
} from '../../../reducers/appSettingsSlice';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const AddEntryModal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);

  const handleModalClose = () => dispatch(modalClosed('none'));
  return (
    <Dialog
      open={activeModal === 'entries' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      <DialogTitle>Add New Entry</DialogTitle>
      <Divider variant="middle" sx={SX.dividerSX} />
      <DialogContent>Replace Form</DialogContent>
      <Divider variant="middle" sx={SX.dividerSX} />
      <DialogActions>
        <Button variant="outlined" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={() => {}}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEntryModal;
