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
import {CiUndo} from "react-icons/ci";

import { useHabitsContext } from "../../store/HabitsContext";
import classes from "./Habit.module.css";
import { db } from "../../firebase-config/config";
import classes from "./HabitActionList.module.css";
import { getFormattedDate } from "../../Utils/Utils";

const HabitActionList = (props) => {  
  const [IsShowActionList, setIsShowActionList] = useState(false);
  const {setIsHabitUpdated, getHabitDataForDate } = useHabitsContext();
  const [HabitStreak, setHabitStreak] = useState(undefined);

  // const streakDataForToday = getHabitDataForDate(props.habit, new Date());
  // console.log(streakDataForToday);

  useEffect(() => {
    const streakData = props.habit.data?.map((data) => {
      return {
        status: data.status,
        startDate: new Date(data.startDate.seconds * 1000),
      };
    });
    const thisStreak = streakData?.find(el => getFormattedDate(el.startDate) === getFormattedDate(new Date()));
    console.log(thisStreak);
    setHabitStreak(thisStreak);    
  }, [])

  const handleActionClick = (e) => {
    console.log(e.target);
    e.preventDefault();
    setIsShowActionList (prev => !prev);
  };

  const habitActionHandler = async (e, action) => {
    e.preventDefault();
    try {
      setIsHabitUpdated(false);
      const thisHabitDoc = doc(db, "habits", props.habit.id);
      console.log(thisHabitDoc);
      const streakDataForToday = {
        startDate: Timestamp.fromDate(new Date()),
        status: action,
      };
      const response = await updateDoc(thisHabitDoc, {
        data: arrayUnion(streakDataForToday),
      });
      console.log(response);
      setIsHabitUpdated(true);
      setHabitStreak(streakDataForToday);
      setIsShowActionList (false);
    } catch (err) {
      console.log(err);
    }
  };

  const habitActionUndo = async (e, action) => {
    e.preventDefault();
    try {
      setIsHabitUpdated(false);
      const thisHabitDoc = doc(db, "habits", props.habit.id);
      console.log(thisHabitDoc);
      const response = await updateDoc(thisHabitDoc, {
        data: arrayRemove(HabitStreak),
      });
      console.log(response);
      setIsHabitUpdated(true);
      setHabitStreak(undefined);
      setIsShowActionList (false);
    } catch (err) {
      console.log(err);
    }
  };

  if(HabitStreak) {
    return (
    <div className={classes["habit-action"]}>      
      <div
        className={`${classes["habit-action-btn"]} ${classes["habit-action-undo"]}`}
        onClick={(e) => habitActionUndo(e, 'done')}
      >
        <CiUndo />
        <p>Undo {HabitStreak.status}</p>
      </div> 
  </div>)
  }

  return (
    <div className={classes["habit-action"]}>
      <div
        className={`${classes["habit-action-btn"]} ${classes["habit-action-done"]}`}
        onClick={(e) => habitActionHandler(e, 'done')}
      >
        <BiCheck />
        <p>Done</p>
      </div>       
      <div>
        <FaEllipsisH
            className={classes["habit-action-more"]}
            onClick={(e) => handleActionClick(e)}
          />
        { IsShowActionList && <div className={classes["habit-action-menu"]}>
            <div onClick={(e) => habitActionHandler(e,'fail')} className={classes['menu-item']}>Fail</div>
            <div onClick={(e) => habitActionHandler(e,'skip')} className={classes['menu-item']}>Skip</div>
        </div> }
      </div>
    </div>
  )
};

export default HabitActionList;
