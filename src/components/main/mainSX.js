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

export const tableRowSX = (style) => {
  const styles = {
    type1: {
      backgroundColor: 'secondary.bg',
      '& .MuiTableCell-root': {
        color: 'white',
      },
    },
    type2: {
      backgroundColor: 'tertiary.main',
      '& .MuiTableCell-root': {
        color: 'secondary.main',
      },
    },
  };
  return styles[style];
};

export const emptyTableCellSX = {
  width: '100%',
  height: '100px',
};
