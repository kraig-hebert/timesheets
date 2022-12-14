const API_URL = 'http://localhost:3001/';

export const get = async (dataList) => {
  const response = await fetch(API_URL + dataList, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return await response.json();
};

export const post = async (entry, dataList) => {
  const response = fetch(API_URL + dataList, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(entry),
  });
  return response;
};

export const patch = async (entry, dataList) => {
  const response = await fetch(`${API_URL + dataList}/${entry.id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(entry),
  });
  return response;
};

export const remove = async (id, dataList) => {
  const response = await fetch(`${API_URL + dataList}/${id}`, {
    method: 'DELETE',
  });
  return response;
};
