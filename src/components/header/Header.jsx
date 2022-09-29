import React from 'react';
import { Container } from '@mui/material';
import { selectActiveUser } from '../../reducers/usersSlice';
import * as SX from './headerSX';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(selectActiveUser);
  return <Container align="right">{user.firstName}</Container>;
};

export default Header;
