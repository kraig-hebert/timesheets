const API_URL = 'http://localhost:3001/entries/';

export const getEntryList = async () => {
  const response = await fetch(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return await response.json();
};
