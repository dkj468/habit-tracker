import classes from "./HabitsHeader.module.css";
import { getCurrentTimeDescription } from "../../Utils/Utils";
const HabitsHeader = () => {
  return (
    <div className={classes["habits-header"]}>
      <span>{getCurrentTimeDescription()}</span>
      <div className={classes["habit-option"]}>
        {/* <input type="text" placeholder="search" /> */}
        <input type="date" placeholder="search" />
        <button type="button" className={classes["btn-add-habit"]}>
          + Add Habits
        </button>
      </div>
    </div>
  );
};

export default HabitsHeader;
