import classes from "./Habit.module.css";
import HabitActionList from "./HabitActionList";
import { useHabitsContext } from "../../store/HabitsContext";

const Habit = (props) => {
  const { habitName, id } = props.habit;
  const { selectedHabit, setSelectedHabitId } = useHabitsContext();

  const handleHabitSelect = (e) => {
    // console.log(props.habit);
    setSelectedHabitId(props.habit.id);
  };

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
