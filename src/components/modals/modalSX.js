export const modalSX = {
  '& .MuiPaper-root': {
    width: '30%',
    borderRadius: '15px',
    border: '2px solid',
    borderColor: 'rgba(0, 0, 0)',
    backgroundColor: 'primary.main',
  },
  '& .MuiDialogTitle-root, & .MuiDialogActions-root': {
    backgroundColor: 'tertiary.main',
    color: 'secondary.main',
  },
  '& .MuiButton-root': {
    color: 'secondary.main',
  },
};

export const dialogTitleSX = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const dialogContentSX = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const dividerSX = {
  backgroundColor: '#fff',
};

export const inputSX = {
  width: '400px',
  backgroundColor: 'tertiary.main',
  input: {
    color: 'secondary.main',
  },
  '&:hover': {
    backgroundColor: 'tertiary.main',
  },
  '&:focus': {
    backgroundColor: 'tertiary.main',
  },
  '& .MuiFilledInput-root::after': {
    borderColor: 'secondary.main',
  },
  '& .MuiFormLabel-root': {
    color: '#fff',
  },
  '& .MuiSvgIcon-root': {
    color: 'secondary.main',
  },
};

export const selectSX = {
  width: '400px',
  color: 'secondary.main',
  backgroundColor: 'tertiary.main',
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'secondary.main',
    },
  },
  '& .MuiSvgIcon-root': {
    color: 'secondary.main',
  },
};

export const labelSX = {
  color: '#fff',
};

export const buttonSX = {
  borderColor: 'secondary.main',
  backgroundColor: 'tertiary.main',
  margin: '5px',
  '&:hover': {
    borderColor: '#fff',
    backgroundColor: 'primary.main',
    color: '#fff',
  },
};

export const boxSX = {
  margin: '0 10px',
};
