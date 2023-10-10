import { getMMMDDFormattedDate } from "../../Utils/Utils";
import classes from "./HabitStreak.module.css";
import { FaFire } from "react-icons/fa";

const HabitStreak = (props) => {
  const selectedHabit = props.selectedHabit;
  const getFormattedStreakData = (thisHabit) => {
    let streakData = undefined;
    if (thisHabit) {
      streakData = thisHabit.data;
      streakData = streakData?.map((data) => {
        return {
          status: data.status,
          startDate: new Date(data.startDate.seconds * 1000),
        };
      });
    }
    return streakData?.length > 0 ? streakData : undefined;
  };

  const calculateHabitsStreak = () => {
    let streakData = getFormattedStreakData(selectedHabit);
    let streakCount = 0;
    let streakDate = undefined;
    if (streakData) {
      streakData = streakData.sort((a, b) => b.startDate - a.startDate);
      // console.log("streakData = " + JSON.stringify(streakData));

      const indexOfFail = streakData.findIndex(
        (data) => data.status === "fail"
      );
      const indexOfSkip = streakData.findIndex(
        (data) => data.status === "skip"
      );

      // console.log("Fail Index : " + indexOfFail, "Skip Index : " + indexOfSkip);

      if (indexOfFail === -1 && indexOfSkip === -1) {
        streakCount = streakData.length;
        streakDate = streakData[streakData.length - 1].startDate;
      } else if (indexOfFail === 0 || indexOfSkip === 0) {
        streakCount = 0;
        streakDate = new Date();
      } else {
        let indexOfLastSuccess = -1;
        if (indexOfFail === indexOfSkip) {
          indexOfLastSuccess = indexOfFail;
        } else if (indexOfFail > indexOfSkip) {
          indexOfLastSuccess = indexOfSkip > 0 ? indexOfSkip : indexOfFail;
        } else {
          indexOfLastSuccess = indexOfFail > 0 ? indexOfFail : indexOfSkip;
        }
        streakCount = indexOfLastSuccess;
        streakDate = streakData[indexOfLastSuccess].startDate;
      }
    }
    return {
      streakCount,
      streakDate,
    };
  };  
  // const { calculateHabitsStreak } = useHabitsContext();

  const { streakCount, streakDate } = calculateHabitsStreak();
  // console.log(streakCount, streakDate);
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
