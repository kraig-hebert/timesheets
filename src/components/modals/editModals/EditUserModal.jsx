import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUser } from '../../../reducers/usersSlice';
import {
  modalClosed,
  selectActiveModal,
} from '../../../reducers/appSettingsSlice';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import * as SX from '../modalSX';

const EditUserModal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [isdAdminValue, setIsAdminValue] = useState(false);
  const [hasCellPhoneValue, setHasCellPhoneValue] = useState(false);

  const handleModalClose = () => dispatch(modalClosed());
  const handleEditClick = () => {
    handleModalClose();
  };

  const handleDeleteClick = () => {
    handleModalClose();
  };

  return (
    <Dialog
      open={activeModal === 'edit-users' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      <DialogTitle>Edit/Delete User</DialogTitle>
      <Divider sx={SX.dividerSX} />
      <DialogContent sx={SX.dialogContentSX}>
        <Stack spacing={1}></Stack>
      </DialogContent>
      <Divider sx={SX.dividerSX} />
      <DialogActions>
        <Button variant="outlined" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleDeleteClick}>
          Delete
        </Button>
        <Button variant="outlined" onClick={handleEditClick}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
