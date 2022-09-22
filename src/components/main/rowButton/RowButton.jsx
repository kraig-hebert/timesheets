import React from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, TableRow, TableCell } from '@mui/material';
import { rowButtonSX } from '../mainSX';
import { modalOpened } from '../../../reducers/appSettingsSlice';

const RowButton = (props) => {
  const { colSpan, icon, buttonType, buttonText } = props;
  const dispatch = useDispatch();

  return (
    <>
      <TableRow>
        <TableCell align="center" colSpan={colSpan}>
          <Button
            variant="contained"
            size="small"
            startIcon={icon}
            onClick={() => dispatch(modalOpened(buttonType))}
            sx={rowButtonSX}
          >
            {buttonText}
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

RowButton.propTypes = {
  colspan: PropTypes.number,
  icon: PropTypes.element,
  buttonType: PropTypes.string,
  buttonText: PropTypes.string,
};

export default RowButton;
