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

export const saveNewEntry = async (entry) => {
  const response = fetch(API_URL, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(entry),
  });
  return response;
};
