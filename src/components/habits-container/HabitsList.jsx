import classes from "./HabitsList.module.css";
import Habit from "./Habit";
import { useHabitsContext } from "../../store/HabitsContext";
import EmptyList from "./EmptyList";
import useHabit from "../../hooks/useHabit";
import { useEffect } from "react";

const HabitsList = () => {
  const habits = useHabit();
  const { habitsList, updateHabitsList } = useHabitsContext();

  useEffect(() => {
    if (habits) {
      console.info("updating habits data into context");
      updateHabitsList(habits);
    }
  }, [habits]);

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
