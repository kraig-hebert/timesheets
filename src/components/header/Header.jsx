import React from 'react';
import { Avatar, Chip, Container, Typography } from '@mui/material';
import { selectActiveUser } from '../../reducers/usersSlice';
import * as SX from './headerSX';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(selectActiveUser);
  return (
    <Container align="right" maxWidth={false} sx={SX.containerSX}>
      <Typography variant="h6">{user.isAdmin && 'Admin'}</Typography>
      <Avatar variant="square" sx={SX.avatarSX} onClick={() => {}}>
        {user.firstName[0]}
      </Avatar>
    </Container>
  );
};

export default Header;
