import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../../reducers/usersSlice';
import RowButton from '../rowButton/RowButton';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as SX from '../mainSX';
import {
  CheckBoxOutlineBlank,
  CheckBox,
  PersonAddAlt,
} from '@mui/icons-material';
import { modalOpened } from '../../../reducers/appSettingsSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const handleRowClick = (id) => {
    dispatch(modalOpened('edit-users'));
  };

  // table row constructor
  const createData = (
    id,
    username,
    password,
    firstName,
    lastName,
    isAdmin,
    hasCellPhone,
    style
  ) => {
    return {
      id,
      username,
      password,
      firstName,
      lastName,
      isAdmin,
      hasCellPhone,
      style,
    };
  };
  const setStyle = (index) => {
    if (index % 2 != 0) return 'type1';
    else return 'type2';
  };

  const rows = users.map((user, index) => {
    return createData(
      user.id,
      user.username,
      user.password,
      user.firstName,
      user.lastName,
      user.isAdmin,
      user.hasCellPhone,
      setStyle(index)
    );
  });

  const renderedRowList = rows.map((row) => (
    <TableRow
      key={row.id}
      sx={SX.tableRowSX(row.style)}
      onClick={(e) => {
        handleRowClick(row.id);
      }}
    >
      <TableCell align="center" sx={{ width: '15%' }}>
        {row.username}
      </TableCell>
      <TableCell align="center" sx={{ width: '15%' }}>
        {row.password}
      </TableCell>
      <TableCell align="center" sx={{ width: '15%' }}>
        {row.firstName}
      </TableCell>
      <TableCell align="center" sx={{ width: '15%' }}>
        {row.lastName}
      </TableCell>
      <TableCell align="center" sx={{ width: '15%' }}>
        {row.isAdmin ? <CheckBox /> : <CheckBoxOutlineBlank />}
      </TableCell>
      <TableCell align="center" sx={{ width: '15%' }}>
        {row.hasCellPhone ? <CheckBox /> : <CheckBoxOutlineBlank />}
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <TableContainer>
        <Table size="small" sx={SX.tableSX}>
          <TableHead>
            <TableRow sx={SX.tableHeadSX}>
              <TableCell align="center" sx={{ width: '15%' }}>
                Username
              </TableCell>

              <TableCell align="center" sx={{ width: '15%' }}>
                Password
              </TableCell>
              <TableCell align="center" sx={{ width: '15%' }}>
                First Name
              </TableCell>
              <TableCell align="center" sx={{ width: '15%' }}>
                Last Name
              </TableCell>
              <TableCell align="center" sx={{ width: '15%' }}>
                Is Admin
              </TableCell>
              <TableCell align="center" sx={{ width: '15%' }}>
                Cell Phone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderedRowList}
            <RowButton
              colSpan={6}
              icon={<PersonAddAlt />}
              buttonType="employee"
              buttonText="Add Employee"
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminPanel;
