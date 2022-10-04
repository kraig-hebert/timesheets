import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  Container,
  Divider,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import {
  selectActiveUser,
  selectUnfilteredUsers,
  userLoggedIn,
  userLoggedOut,
} from '../../reducers/usersSlice';
import * as SX from './headerSX';
import { useSelector } from 'react-redux';
import { openPageSelected } from '../../reducers/appSettingsSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectActiveUser);
  const users = useSelector(selectUnfilteredUsers);
  const [userInputValue, setUserInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLoginClick = () => {
    users.forEach((user) => {
      if (
        user.username === userInputValue &&
        user.password === passwordInputValue
      )
        dispatch(userLoggedIn(user));
    });
  };
  const handleLogoutClick = () => dispatch(userLoggedOut());

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = (e) => setAnchorEl(null);
  const handleAdminOpen = (e) => {
    handleMenuClose();
    dispatch(openPageSelected('admin'));
  };

  return (
    <>
      {typeof user === 'object' ? (
        <>
          <Container
            maxWidth={false}
            sx={[SX.containerSX, SX.containerAlignRightSX]}
          >
            <Typography variant="h6" sx={SX.typoSX}>
              {user.isAdmin && 'Admin'}
            </Typography>
            <Avatar
              variant="square"
              sx={SX.avatarSX}
              onMouseEnter={(e) => {
                handleAvatarClick(e);
              }}
            >
              {user.firstName[0]}
            </Avatar>
          </Container>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={(e) => {
              handleMenuClose(e);
            }}
          >
            {user.isAdmin && (
              <MenuItem
                onClick={(e) => {
                  handleAdminOpen(e);
                }}
              >
                Admin Panel
              </MenuItem>
            )}
            {user.isAdmin && <Divider />}
            <MenuItem
              onClick={(e) => {
                handleMenuClose(e);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleMenuClose(e);
                dispatch(userLoggedOut());
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Container
          maxWidth={false}
          sx={[SX.containerSX, SX.containerAlignCenterSX]}
        >
          <TextField
            label="UserName"
            size="small"
            value={userInputValue}
            onChange={(e) => {
              setUserInputValue(e.target.value);
            }}
            sx={SX.textFieldSX}
          />
          <TextField
            label="Password"
            type="password"
            size="small"
            value={passwordInputValue}
            onChange={(e) => {
              setPasswordInputValue(e.target.value);
            }}
            sx={SX.textFieldSX}
          />
          <Button
            variant="outlined"
            onClick={handleLoginClick}
            sx={SX.buttonSX}
          >
            Login
          </Button>
        </Container>
      )}
    </>
  );
};

export default Header;
