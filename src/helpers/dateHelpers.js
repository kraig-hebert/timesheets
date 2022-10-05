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
export const getMonthName = (monthIndex) => MONTHS[monthIndex];

// return month index from name
export const getMonthIndex = (monthName) => MONTHS.indexOf(monthName);

// return formatted time string for table
export const getTimeString = (dateObject) => {
  const pieces = dateObject.toLocaleTimeString().split(':');
  const lastItem = pieces[pieces.length - 1];
  const amOrPm = lastItem.slice(lastItem.length - 3, lastItem.length);
  return `${pieces[0]} : ${pieces[1]} ${amOrPm}`;
};

// changes memory object to Date.JSON or returns Date.JSON
// this will have onlt the DATE as part of the Date Object
// time will be zeroed out
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

// changes memory object to Date.JSON or returns Date.JSON
// this will have both DATE and TIME as part of the Date Object
// seconds will be zeroed out
export const forceDateTimeString = (dateObj) => {
  if (dateObj.hasOwnProperty('_isAMomentObject')) {
    const newDateObj = dateObj.toDate();
    newDateObj.setSeconds(0);
    return newDateObj.toJSON();
  } else {
    dateObj.setSeconds(0);
    return dateObj.toJSON();
  }
};

// return today hours worked formatted HH:MM
export const getTotalHours = (milliseconds) => {
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
  return [hours.toString(), minutes.toString().padStart(2, '0')].join(':');
};

// return date in "Month date" format for table
export const setTableDate = (dateObject) =>
  `${getMonthName(dateObject.getMonth())} ${dateObject.getDate()}`;
