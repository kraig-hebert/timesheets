export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const YEARS = ['2022', '2021', '2020'];

// return month name from dateObject.getMonth()
export const getMonthName = (monthNum) => {
  return MONTHS[monthNum];
};

// return formatted time string for table
export const getTimeString = (dateObject) => {
  return dateObject.toLocaleTimeString();
};

// changes memory object to Date.JSON or returns Date.JSON
export const forceDateString = (dateObj) => {
  if (dateObj.hasOwnProperty('_isAMomentObject')) {
    const newDateObj = dateObj.toDate();
    return new Date(
      newDateObj.getFullYear(),
      newDateObj.getMonth(),
      newDateObj.getDate()
    ).toJSON();
  } else
    return new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate()
    ).toJSON();
};

// return today hours worked formatted HH:MM
export const getTotalHours = (milliseconds) => {
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
  return [hours.toString(), minutes.toString().padStart(2, '0')].join(':');
};

// return date in "Month date" format for table
export const setTableDate = (dateObject) => {
  const monthNum = dateObject.getMonth();
  return `${getMonthName(monthNum)} ${dateObject.getDate()}`;
};
