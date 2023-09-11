import { FaEllipsisH } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";

import { useHabitsContext } from "../../store/HabitsContext";
import classes from "./Habit.module.css";
import { db } from "../../firebase-config/config";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import HabitActionList from "../UI/HabitActionList";

const Habit = (props) => {
  const { habitName, id } = props.habit;
  const { setSelectedHabit, setIsHabitUpdated } = useHabitsContext();

  const handleHabitSelect = (e) => {
    console.log(props.habit);
    setSelectedHabit(props.habit);
  };

  const handleActionClick = (e) => {
    console.log(e.target);
    e.preventDefault();
  };

  const doneClickHandler = async (e) => {
    e.preventDefault();
    try {
      setIsHabitUpdated(false);
      const thisHabitDoc = doc(db, "habits", props.habit.id);
      console.log(thisHabitDoc);
      const response = await updateDoc(thisHabitDoc, {
        data: arrayUnion({
          startDate: Timestamp.fromDate(new Date()),
          status: "done",
        }),
      });
      console.log(response);
      setIsHabitUpdated(true);
    } catch (err) {
      console.log(err);
    }

    console.log(e.target);
  };
  return (
    <div className={classes.habit} id={id}>
      <div
        className={classes["habit-detail"]}
        onClick={(e) => handleHabitSelect(e)}
      >
        <p>{habitName}</p>
      </div>
      <div className={classes["habit-action"]}>
        <div
          className={classes["habit-action-done"]}
          onClick={doneClickHandler}
        >
          <BiCheck />
          <p>Done</p>
        </div>
        <FaEllipsisH
          className={classes["habit-action-more"]}
          id={id}
          onClick={(e) => handleActionClick(e)}
        />
        <HabitActionList className={classes["habit-action-menu"]}>
          <ul>
            <li>Skip</li>
            <li>Fail</li>
          </ul>
        </HabitActionList>
      </div>
    </div>
  );
};

export default Habit;
