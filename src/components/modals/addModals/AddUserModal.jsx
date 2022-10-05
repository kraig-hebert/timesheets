import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewUser } from '../../../reducers/usersSlice';
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
  FormControlLabel,
  Stack,
  TextField,
  FormGroup,
} from '@mui/material';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';

import * as SX from '../modalSX';

const AddUserModal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [isdAdminValue, setIsAdminValue] = useState(false);
  const [hasCellPhoneValue, setHasCellPhoneValue] = useState(false);

  const clearForm = () => {
    setUsernameValue('');
    setPasswordValue('');
    setFirstNameValue('');
    setLastNameValue('');
    setIsAdminValue(false);
    setHasCellPhoneValue(false);
  };

  const handleModalClose = () => dispatch(modalClosed());
  const handleAddClick = () => {
    const newUser = {
      username: usernameValue,
      password: passwordValue,
      firstName: firstNameValue,
      lastName: lastNameValue,
      isAdmin: isdAdminValue,
      hasCellPhone: hasCellPhoneValue,
    };
    clearForm();
    handleModalClose();
    dispatch(saveNewUser(newUser));
  };

  return (
    <Dialog
      open={activeModal === 'employee' ? true : false}
      onClose={handleModalClose}
      sx={SX.modalSX}
    >
      <DialogTitle>Add New User</DialogTitle>
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
        <Button variant="outlined" onClick={handleAddClick}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
