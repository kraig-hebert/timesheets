export const textFieldSX = {
  width: '500px',
  input: {
    color: 'primary.main',
  },
  '& .MuiInputLabel-root': {
    color: 'secondary.main',
  },
  '& .MuiFilledInput-input': {
    borderBottom: '2px solid',
    borderColor: 'primary.main',
    backgroundColor: 'primary.bg',
  },
};

export const labelSX = {
  color: 'primary.main',
};

export const selectSX = {
  width: '300px',
  color: 'secondary.main',

  backgroundColor: 'primary.bg',
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary.main',
  },
  '& .MuiSvgIcon-root': {
    color: 'primary.main',
  },
};
