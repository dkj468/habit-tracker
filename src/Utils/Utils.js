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

export const getFormattedDate = (thisDate) => {
  const thisYear = thisDate.toLocaleString("default", { year: "numeric" });
  const thisMonth = thisDate.toLocaleString("default", { month: "2-digit" });
  const thisDay = thisDate.toLocaleString("default", { day: "2-digit" });

  return `${thisYear}-${thisMonth}-${thisDay}`;
};

export const getMMMDDFormattedDate = (thisDate) => {

  return thisDate.toLocaleString("default", {
    month:"short",
    year:"numeric",
    day:"numeric"
  })
}
