import React from 'react';
import { PropTypes } from 'prop-types';
import { boxSX, buttonSX } from '../../modalSX';
import { Box, Button } from '@mui/material';

const EditableExpenses = (props) => {
  const { handleExpenseClick, editExpenseList } = props;

  const renderedExpenseButtons = editExpenseList.map((expense) => {
    return (
      <Button
        variant="outlined"
        key={expense.id}
        sx={buttonSX}
        onClick={() => handleExpenseClick(expense)}
      >
        <Box sx={boxSX}>{expense.destination}</Box>
        <Box sx={boxSX}>{expense.miles} miles</Box>
      </Button>
    );
  });

  return <>{renderedExpenseButtons}</>;
};

EditableExpenses.propTypes = {
  handleExpenseClick: PropTypes.func,
  editExpenseList: PropTypes.array,
};
export default EditableExpenses;
