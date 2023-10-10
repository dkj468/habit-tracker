import { useEffect, useState } from "react";
import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { FaEllipsisH } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";
import { CiUndo } from "react-icons/ci";

import { useHabitsContext } from "../../store/HabitsContext";
import { db } from "../../firebase-config/config";
import classes from "./HabitActionList.module.css";
import { getFormattedDate } from "../../Utils/Utils";

const HabitActionList = (props) => {
  const [IsShowActionList, setIsShowActionList] = useState(false);

  const getHabitStreak = () => {
    const result = props.habit.data?.find((data) => {
      const startDate = new Date(data.startDate.seconds * 1000);
      return getFormattedDate(startDate) === getFormattedDate(new Date())
    });

    return result;
  }

  const handleActionClick = (e) => {
    // console.log(e.target);
    e.preventDefault();
    setIsShowActionList((prev) => !prev);
  };

  const habitActionHandler = async (e, action) => {
    e.preventDefault();
    try {
      const thisHabitDoc = doc(db, "habits", props.habit.id);
      // console.log(thisHabitDoc);
      const streakDataForToday = {
        startDate: Timestamp.fromDate(new Date()),
        status: action,
      };
      const response = await updateDoc(thisHabitDoc, {
        data: arrayUnion(streakDataForToday),
      });
      const thisHabit = props.habit;
      if(thisHabit.data) {
        thisHabit.data.push(streakDataForToday);
      } else {
        const data = [streakDataForToday];
        thisHabit.data = data;
      }
      
      props.OnHabitChange(thisHabit);      
      setIsShowActionList(false);
    } catch (err) {
      console.log(err);
    }
  };

  const habitActionUndo = async (e, action) => {
    e.preventDefault();
    try {
      const thisHabitDoc = doc(db, "habits", props.habit.id);
      const habitStreak = getHabitStreak();
      const response = await updateDoc(thisHabitDoc, {
        data: arrayRemove(habitStreak),
      });

      const thisHabit = props.habit;
      // find index of this streak
      const thisIndex = thisHabit.data.findIndex (el => el.startDate === habitStreak.startDate);
      if(thisIndex >= 0) {
        thisHabit.data.splice(thisIndex);
        props.OnHabitChange(thisHabit);
      }
      setIsShowActionList(false);
    } catch (err) {
      console.log(err);
    }
  };

  const habitStreak = getHabitStreak();
  if (habitStreak) {
    return (
      <div className={classes["habit-action"]}>
        <div
          className={`${classes["habit-action-btn"]} ${classes["habit-action-undo"]}`}
          onClick={(e) => habitActionUndo(e, "done")}
        >
          <CiUndo />
          <p>Undo {habitStreak.status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes["habit-action"]}>
      <div
        className={`${classes["habit-action-btn"]} ${classes["habit-action-done"]}`}
        onClick={(e) => habitActionHandler(e, "done")}
      >
        <BiCheck />
        <p>Done</p>
      </div>
      <div>
        <FaEllipsisH
          className={classes["habit-action-more"]}
          onClick={(e) => handleActionClick(e)}
        />
        {IsShowActionList && (
          <div className={classes["habit-action-menu"]}>
            <div
              onClick={(e) => habitActionHandler(e, "fail")}
              className={classes["menu-item"]}
            >
              Fail
            </div>
            <div
              onClick={(e) => habitActionHandler(e, "skip")}
              className={classes["menu-item"]}
            >
              Skip
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitActionList;
