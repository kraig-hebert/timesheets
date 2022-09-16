export const getMonthName = (monthNum) => {
  const MONTHS = [
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
  return MONTHS[monthNum];
};

export const getTimeString = (dateObject) => {
  return dateObject.toLocaleTimeString();
};

export const getHours = (milliseconds) => {
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
  return [hours.toString(), minutes.toString().padStart(2, '0')].join(':');
};
