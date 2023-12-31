import classes from "./HabitsList.module.css";
import Habit from "./Habit";
import EmptyList from "./EmptyList";

const HabitsList = (props) => {
  const { setIsAddHabit } = props;
  const { habits } = props;
  if (!habits || habits.length === 0) {
    return <EmptyList setIsAddHabit={setIsAddHabit}/>;
  }

  return (
    <div className={classes["habit-list"]}>
      {habits.map((habit) => {
        return <Habit IsSelected = {props.selectedHabit && props.selectedHabit.id === habit.id} habit={habit} key={habit.id} OnHabitSelect= {props.OnHabitSelect} OnHabitChange= {props.OnHabitChange}/>;
      })}
    </div>
  );
};

export default HabitsList;
