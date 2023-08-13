export const getCurrentTimeDescription = () => {
  const thisDate = new Date();
  const hour = thisDate.getHours() * 1;
  // console.log(hour);
  if (hour > 0 && hour <= 11) {
    return "Morning";
  } else if (hour > 11 && hour <= 16) {
    return "Afternoon";
  } else if (hour > 16 && hour <= 24) {
    return "Evening";
  } else {
    return "None";
  }
};