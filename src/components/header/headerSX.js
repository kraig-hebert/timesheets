export const textFieldSX = {
  width: '500px',
  input: {
    color: 'secondary.main',
  },
  '& .MuiInputLabel-root': {
    color: 'secondary.main',
  },
  '& .MuiFilledInput-input': {
    borderBottom: '2px solid',
    borderColor: 'secondary.main',
    backgroundColor: 'primary.textInput',
  },
};

export const labelSX = {
  color: 'secondary.main',
};

export const selectSX = {
  width: '300px',
  backgroundColor: 'primary.textInput',
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'secondary.main',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'secondary.main',
  },
  '& .MuiSvgIcon-root': {
    color: 'secondary.main',
  },
};
