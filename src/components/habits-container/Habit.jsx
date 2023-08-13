import { useHabitsContext } from "../../store/HabitsContext";
import classes from "./Habit.module.css";

const Habit = (props) => {
  const habit = props.habit;
  const { setSelectedHabit } = useHabitsContext();
  const handleHabitSelect = (e) => {
    console.log(habit);
    setSelectedHabit(habit);
  };
  return (
    <div
      className={classes.habit}
      id={habit.id}
      onClick={(e) => handleHabitSelect(e)}
    >
      <p>{habit.name}</p>
      <div>
        <span>This is habit action</span>
      </div>
    </div>
  );
};

export default Habit;
