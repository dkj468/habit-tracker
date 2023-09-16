import { BsPlus } from "react-icons/bs";

import classes from "./HabitsHeader.module.css";
import { getCurrentTimeDescription, getFormattedDate } from "../../Utils/Utils";
import { useState } from "react";
import AddHabit from "../habit/AddHabit";
import NewHabit from "../habit/NewHabit";

const currentDate = getFormattedDate(new Date());
const HabitsHeader = () => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [IsAddHabit, setIsAddHabit] = useState(false);

  return (
    <div className={classes["habits-header"]}>
      <span>{getCurrentTimeDescription()}</span>
      <div className={classes["habit-option"]}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(getFormattedDate(e.target.valueAsDate))
          }
        />
        <AddHabit onAddHabit={setIsAddHabit} />
        {IsAddHabit && <NewHabit onAddHabit={setIsAddHabit} />}
      </div>
    </div>
  );
};

export default HabitsHeader;
