import { BsPlus } from "react-icons/bs";

import classes from "./HabitsHeader.module.css";
import { getCurrentTimeDescription, getFormattedDate } from "../../Utils/Utils";
import { useState } from "react";

const currentDate = getFormattedDate(new Date());
const HabitsHeader = () => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  return (
    <div className={classes["habits-header"]}>
      <span>{getCurrentTimeDescription()}</span>
      <div className={classes["habit-option"]}>
        {/* <input type="text" placeholder="search" /> */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(getFormattedDate(e.target.valueAsDate))
          }
        />
        <div className={classes["habit-add"]}>
          <BsPlus className={classes["habit-add-icon"]} />
          <p className={classes["txt-add-habit"]}>Add Habits</p>
        </div>
      </div>
    </div>
  );
};

export default HabitsHeader;
