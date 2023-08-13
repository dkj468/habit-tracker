import { useHabitsContext } from "../../store/HabitsContext";
import classes from "./Habit.module.css";

import { FaEllipsisH } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";

const Habit = (props) => {
  const habit = props.habit;
  const { setSelectedHabit } = useHabitsContext();

  const handleHabitSelect = (e) => {
    console.log(habit);
    setSelectedHabit(habit);
  };

  const handleActionClick = (e) => {
    console.log(e.target);
    e.preventDefault();
  };
  return (
    <div className={classes.habit} id={habit.id}>
      <div
        className={classes["habit-detail"]}
        onClick={(e) => handleHabitSelect(e)}
      >
        <p>{habit.name}</p>
      </div>
      <div className={classes["habit-action"]}>
        <div className={classes["habit-action-done"]}>
          <BiCheck />
          <p>Done</p>
        </div>

        <FaEllipsisH
          className={classes["habit-action-more"]}
          id={habit.id}
          onClick={(e) => handleActionClick(e)}
        />
      </div>
    </div>
  );
};

export default Habit;
