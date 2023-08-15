import classes from "./HabitsList.module.css";

import Habit from "./Habit";
import { useHabitsContext } from "../../store/HabitsContext";
import EmptyList from "./EmptyList";

const HabitsList = () => {
  const ctx = useHabitsContext();
  // console.log(ctx);
  const habitsList = ctx.habitsList;

  if (habitsList.length === 0) {
    return <EmptyList />;
  }
  return (
    <div className={classes["habit-list"]}>
      {habitsList.map((habit) => {
        return <Habit habit={habit} key={habit.id} />;
      })}
    </div>
  );
};

export default HabitsList;
