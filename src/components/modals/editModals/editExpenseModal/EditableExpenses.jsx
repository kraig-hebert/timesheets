import React from 'react';
import { PropTypes } from 'prop-types';
import { buttonSX, boxSX } from '../../modalSX';
import { Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectEditExpenses } from '../../../../reducers/expensesSlice';
import EditableExpense from './EditableExpense';

const EditableExpenses = (props) => {
  const { handleExpenseClick } = props;
  const editExpenseList = useSelector(selectEditExpenses);

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

EditableExpense.propTypes = {
  handleExpenseClick: PropTypes.func,
};
export default EditableExpenses;
