import classes from "./HabitsList.module.css";
import Habit from "./Habit";
import EmptyList from "./EmptyList";

const HabitsList = (props) => {
  console.log("rendering habits list");
  const { habits } = props;
  if (habits.length === 0) {
    return <EmptyList />;
  }
  return (
    <div className={classes["habit-list"]}>
      {habits.map((habit) => {
        return <Habit habit={habit} key={habit.id} />;
      })}
    </div>
  );
};

export default HabitsList;
