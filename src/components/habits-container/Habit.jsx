import classes from "./Habit.module.css";
import HabitActionList from "./HabitActionList";
import { useHabitsContext } from "../../store/HabitsContext";
import { useEffect } from "react";

const Habit = (props) => {
  // console.log("Habit render start");
  const { habitName, id } = props.habit;
  const { selectedHabit, setSelectedHabitId } = useHabitsContext();

  const handleHabitSelect = (e) => {
    props.OnHabitSelect(props.habit);
  };

  // useEffect(() => {
  //   // console.log("Habit render complete");
  // });
  
  const cssClassName =
    selectedHabit && id === selectedHabit.id
      ? `${classes.habit} ${classes.selected}`
      : classes.habit;

  return (
    <div className={cssClassName} id={id}>
      <div
        className={classes["habit-detail"]}
        onClick={(e) => handleHabitSelect(e)}
      >
        <p>{habitName}</p>
      </div>
      <HabitActionList habit={props.habit} />
    </div>
  );
};

export default Habit;
