import { useEffect } from "react";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

import classes from "./HabitsList.module.css";
import { db } from "../../firebase-config/config";
import Habit from "./Habit";
import { useHabitsContext } from "../../store/HabitsContext";
import { useAuthContext} from "../../store/AuthContext";
import EmptyList from "./EmptyList";
import useHabit from "../../hooks/useHabit";

const HabitsList = () => {

  const {habits} = useHabit();
  const {habitsList, updateHabitsList} = useHabitsContext();

  updateHabitsList(habits);

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
