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
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#fff',
        '& .MuiTableCell-root': {
          color: '#000',
        },
      },

      '& .MuiTableCell-root': {
        color: 'secondary.main',
      },
      '& .MuiTableCell-root': {
        color: 'white',
      },
    },
    type2: {
      backgroundColor: 'tertiary.main',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#fff',
        '& .MuiTableCell-root': {
          color: '#000',
        },
      },

      '& .MuiTableCell-root': {
        color: 'secondary.main',
      },
    },
  };
  return styles[style];
};

export const tableRowWithButtonSX = {
  margin: '0',
};

export const rowButtonSX = {
  width: '100%',
};
