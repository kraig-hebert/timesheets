export const tableSX = {
  width: '90%',
  margin: 'auto',
  backgroundColor: 'primary.bg',
  border: '2px solid',
  borderColor: 'rgba(0, 0, 0)',
};

export const tableHeadSX = {
  backgroundColor: 'primary.bg',
  height: '50px',
  '& .MuiTableCell-root': {
    color: 'white',
  },
};

export const tableRowSX = (id) => {
  // set styling for every other row
  if (id % 2 === 0) {
    return {
      backgroundColor: 'secondary.bg',
      '& .MuiTableCell-root': {
        color: 'white',
      },
    };
  }
  return {
    backgroundColor: 'tertiary.main',
    '& .MuiTableCell-root': {
      color: 'secondary.main',
    },
  };
};
