const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const formatDate = date => {
  const D = new Date(date);
  return `${MONTHS[D.getMonth()]} ${D.getDate()}, ${D.getFullYear()}`
};
  
