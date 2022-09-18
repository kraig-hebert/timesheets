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

// return month name from dateObject.getMonth()
export const getMonthName = (monthNum) => {
  return MONTHS[monthNum];
};

// return formatted time string for table
export const getTimeString = (dateObject) => {
  return dateObject.toLocaleTimeString();
};

// return today hours worked formatted HH:MM
export const getTotalHours = (milliseconds) => {
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
  return [hours.toString(), minutes.toString().padStart(2, '0')].join(':');
};
