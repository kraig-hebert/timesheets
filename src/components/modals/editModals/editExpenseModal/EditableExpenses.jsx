import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { boxSX, buttonSX, popoverSX } from '../../modalSX';
import { Box, Button, Popover, Typography } from '@mui/material';
import { ModeEditOutline } from '@mui/icons-material';
import { Stack } from '@mui/system';

const EditableExpenses = (props) => {
  const { handleExpenseClick, editExpenseList } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseOver = (e) => setAnchorEl(e.currentTarget);
  const handleMouseOut = (e) => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const renderedExpenseButtons = editExpenseList.map((expense) => {
    return (
      <Stack key={expense.id} direction="row" justifyContent="center">
        <Button
          variant="outlined"
          sx={buttonSX}
          onClick={() => handleExpenseClick(expense)}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
        >
          <Box sx={boxSX}>{expense.expense}</Box>
          {expense.hasOwnProperty('cost') ? (
            <Box sx={boxSX}>$ {expense.cost}</Box>
          ) : (
            <Box sx={boxSX}>{expense.miles}</Box>
          )}{' '}
        </Button>
        <Popover
          id="mouse-over-popover"
          sx={popoverSX}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 10,
            horizontal: -10,
          }}
          onClose={handleMouseOut}
          elevation={0}
          disableRestoreFocus
        >
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ width: '75px' }}
          >
            <ModeEditOutline /> <Typography varaint="h7">Edit</Typography>
          </Stack>
        </Popover>
      </Stack>
    );
  });

  return <>{renderedExpenseButtons}</>;
};

EditableExpenses.propTypes = {
  handleExpenseClick: PropTypes.func,
  editExpenseList: PropTypes.array,
};
export default EditableExpenses;
