import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { useSelector } from 'react-redux';
import { selectSortEditableBy } from '../../../../reducers/expensesSlice';
import EditDestination from './EditDestination';
import EditItem from './EditItem';

const EditableExpense = (props) => {
  const sortBy = useSelector(selectSortEditableBy);
  const {
    editableExpense,
    datePickerValue,
    setDatePickerValue,
    destinationValue,
    setDestinationValue,
    itemValue,
    setItemValue,
    milesValue,
    setMilesValue,
    costValue,
    setCostValue,
  } = props;

  useEffect(() => {
    if (sortBy === 'miles') {
      setDatePickerValue(editableExpense.date);
      setDestinationValue(editableExpense.expense);
      setMilesValue(editableExpense.miles);
    } else {
      setDatePickerValue(editableExpense.date);
      setItemValue(editableExpense.expense);
      setCostValue(editableExpense.cost);
    }
  }, [editableExpense]);

  return (
    <>
      {sortBy === 'miles' ? (
        <EditDestination
          datePickerValue={datePickerValue}
          setDatePickerValue={setDatePickerValue}
          destinationValue={destinationValue}
          setDestinationValue={setDestinationValue}
          milesValue={milesValue}
          setMilesValue={setMilesValue}
        />
      ) : (
        <EditItem
          datePickerValue={datePickerValue}
          setDatePickerValue={setDatePickerValue}
          itemValue={itemValue}
          setItemValue={setItemValue}
          costValue={costValue}
          setCostValue={setCostValue}
        />
      )}
    </>
  );
};

EditableExpense.propTypes = {
  editableExpense: PropTypes.object,
  datePickerValue: PropTypes.object,
  setDatePickerValue: PropTypes.func,
  destinationValue: PropTypes.string,
  setDestinationValue: PropTypes.func,
  itemValue: PropTypes.string,
  setItemValue: PropTypes.func,
  milesValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setMilesValue: PropTypes.func,
  costValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCostValue: PropTypes.func,
};

export default EditableExpense;
