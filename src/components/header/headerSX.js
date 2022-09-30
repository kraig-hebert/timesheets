export const containerSX = {
  width: '90%',
  display: 'flex',
  alignItems: 'center',
};

export const containerAlignRightSX = {
  justifyContent: 'flex-end',
};
export const containerAlignCenterSX = {
  justifyContent: 'center',
};

export const typoSX = {
  color: 'primary.main',
};

export const avatarSX = {
  backgroundColor: 'primary.main',
  color: 'secondary.main',
  marginLeft: '20px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'primary.bg',
    color: 'primary.main',
  },
};

export const textFieldSX = {
  width: '300px',
  color: 'secondary.main',
  margin: '0 10px',
  input: {
    color: 'secondary.main',
  },
  '& .MuiInputLabel-root': {
    color: 'secondary.main',
  },
  backgroundColor: 'primary.bg',
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary.main',
  },
};

export const buttonSX = {
  backgroundColor: 'primary.main',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'secondary.main',
  },
};
