import { BsPlus } from "react-icons/bs";

import classes from "./HabitsHeader.module.css";
import { getCurrentTimeDescription, getFormattedDate } from "../../Utils/Utils";
import { useState } from "react";
import AddHabit from "../habit/AddHabit";

const currentDate = getFormattedDate(new Date());
const HabitsHeader = () => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

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
        <AddHabit />
      </div>
    </div>
  );
};

export default HabitsHeader;
