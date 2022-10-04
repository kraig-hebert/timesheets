import React from 'react';
import { Button } from '@mui/material';
import { openPageSelected } from '../../../reducers/appSettingsSlice';
import { useDispatch } from 'react-redux';

const AdminActionRow = () => {
  const dispatch = useDispatch();
  const handleButtonClick = (e) => dispatch(openPageSelected('Entries'));
  return (
    <Button
      variant="outlined"
      onClick={(e) => {
        handleButtonClick(e);
      }}
    >
      Return to TimeSheets
    </Button>
  );
};

export default AdminActionRow;
