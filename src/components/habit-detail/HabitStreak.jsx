import { getMMMDDFormattedDate } from "../../Utils/Utils";
import { useHabitsContext } from "../../store/HabitsContext";
import classes from "./HabitStreak.module.css";
import { FaFire } from "react-icons/fa";

const HabitStreak = () => {
  // const selectedHabit = props.selectedHabit;
  const { calculateHabitsStreak } = useHabitsContext();

  const { streakCount, streakDate } = calculateHabitsStreak();
  console.log(streakCount, streakDate);
  return (
    <div className={classes["streak-container"]}>
      <FaFire className={classes["icon-streak"]} />
      <div className={classes["streak-details"]}>
        <p className={classes["txt-streak"]}>Current Streak</p>
        <p className={classes["txt-streak-count"]}>{streakCount} days</p>
      </div>
      {streakDate && (
        <div className={classes["streak-date"]}>
          From {getMMMDDFormattedDate(streakDate)}
        </div>
      )}
    </div>
  );
};

export default HabitStreak;
