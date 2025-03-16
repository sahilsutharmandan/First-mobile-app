export const convertToAMPM = dateTimeString => {
  const date = new Date(dateTimeString);
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${hours}${ampm}`;
};
