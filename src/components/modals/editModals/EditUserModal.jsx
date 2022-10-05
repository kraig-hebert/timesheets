import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  editUser,
  selectEditUser,
} from '../../../reducers/usersSlice';
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
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';

import * as SX from '../modalSX';
import { useInsertionEffect } from 'react';

const EditUserModal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const editableUser = useSelector(selectEditUser);

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [isdAdminValue, setIsAdminValue] = useState(false);
  const [hasCellPhoneValue, setHasCellPhoneValue] = useState(false);

  const handleModalClose = () => dispatch(modalClosed());
  const handleEditClick = () => {
    const editedUser = {
      id: editableUser.id,
      username: usernameValue,
      password: passwordValue,
      firstName: firstNameValue,
      lastName: lastNameValue,
      isAdmin: isdAdminValue,
      hasCellPhone: hasCellPhoneValue,
    };
    handleModalClose();
    dispatch(editUser(editedUser));
  };

  const handleDeleteClick = () => {
    handleModalClose();
    dispatch(deleteUser(editableUser.id));
  };

  useEffect(() => {
    if (editableUser != undefined) {
      setUsernameValue(editableUser.username);
      setPasswordValue(editableUser.password);
      setFirstNameValue(editableUser.firstName);
      setLastNameValue(editableUser.lastName);
      setIsAdminValue(editableUser.isAdmin);
      setHasCellPhoneValue(editableUser.hasCellPhone);
    }
  }, [editableUser]);

  return (
    <Dialog
      open={activeModal === 'edit-users' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      <DialogTitle>Edit/Delete User</DialogTitle>
      <Divider sx={SX.dividerSX} />
      <DialogContent sx={SX.dialogContentSX}>
        <Stack spacing={1}>
          <TextField
            margin="dense"
            id="username"
            label="Username"
            placeholder="Enter a Username"
            type="text"
            variant="filled"
            onChange={(e) => {
              setUsernameValue(e.target.value);
            }}
            value={usernameValue}
            sx={SX.inputSX}
          />
          <TextField
            margin="dense"
            id="passsword"
            label="Password"
            placeholder="Enter a Password"
            type="password"
            variant="filled"
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            value={passwordValue}
            sx={SX.inputSX}
          />
          <TextField
            margin="dense"
            id="first-name"
            label="First Name"
            placeholder="Enter a First Name"
            type="text"
            variant="filled"
            onChange={(e) => {
              setFirstNameValue(e.target.value);
            }}
            value={firstNameValue}
            sx={SX.inputSX}
          />
          <TextField
            margin="dense"
            id="last-name"
            label="Last Name"
            placeholder="Enter a Last Name"
            type="text"
            variant="filled"
            onChange={(e) => {
              setLastNameValue(e.target.value);
            }}
            value={lastNameValue}
            sx={SX.inputSX}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isdAdminValue}
                  checkedIcon={<CheckBox sx={{ color: 'secondary.main' }} />}
                  icon={
                    <CheckBoxOutlineBlank sx={{ color: 'secondary.main' }} />
                  }
                  onChange={(e) => {
                    setIsAdminValue(e.target.checked);
                  }}
                />
              }
              label="Is Admin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasCellPhoneValue}
                  checkedIcon={<CheckBox sx={{ color: 'secondary.main' }} />}
                  icon={
                    <CheckBoxOutlineBlank sx={{ color: 'secondary.main' }} />
                  }
                  onChange={(e) => {
                    setHasCellPhoneValue(e.target.checked);
                  }}
                />
              }
              label="Has Cell Phone"
            />
          </FormGroup>
        </Stack>
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
