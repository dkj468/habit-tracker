
import classes from "./Habit.module.css";
import HabitActionList from "./HabitActionList";
import { useHabitsContext } from "../../store/HabitsContext";

const Habit = (props) => {
  const { habitName, id } = props.habit;
  const { setSelectedHabit, setSelectedHabitId} = useHabitsContext();

  const handleHabitSelect = (e) => {
    // console.log(props.habit);
    setSelectedHabitId(props.habit.id);    
  };

  return (
    <div className={classes.habit} id={id}>
      <div
        className={classes["habit-detail"]}
        onClick={(e) => handleHabitSelect(e)}
      >
        <p>{habitName}</p>
      </div>
      <HabitActionList habit={props.habit}/>
    </div>
  );
};

export default Habit;
