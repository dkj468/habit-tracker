import { BsPlus } from "react-icons/bs";

import classes from "./HabitsHeader.module.css";
import { getCurrentTimeDescription, getFormattedDate } from "../../Utils/Utils";
import { useState } from "react";
import AddHabit from "../habit/AddHabit";
import NewHabit from "../habit/NewHabit";

const currentDate = getFormattedDate(new Date());

const HabitsHeader = (props) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);  
  const { onDateChange, OnAddNewHabit, IsAddHabit, setIsAddHabit } = props;

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    // pass the new date to parent to filter the data
    onDateChange(newValue);
  };
  return (
    <div className={classes["habits-header"]}>
      <span>{getCurrentTimeDescription()}</span>
      <div className={classes["habit-option"]}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            handleDateChange(getFormattedDate(e.target.valueAsDate))
          }
        />
        <AddHabit onAddHabit={setIsAddHabit} />
        {IsAddHabit && <NewHabit onAddHabit={setIsAddHabit} OnAddNewHabit= {OnAddNewHabit}/>}
      </div>
    </div>
  );
};

export default HabitsHeader;
