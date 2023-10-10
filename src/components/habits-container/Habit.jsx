import classes from "./Habit.module.css";
import HabitActionList from "./HabitActionList";

const Habit = (props) => {
  const { habitName, id } = props.habit;

  

  const handleHabitSelect = (e) => {
    props.OnHabitSelect(props.habit);
  };
  
  const cssClassName =
  props.IsSelected
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
      <HabitActionList habit={props.habit} OnHabitChange= {props.OnHabitChange}/>
    </div>
  );
};

export default Habit;
