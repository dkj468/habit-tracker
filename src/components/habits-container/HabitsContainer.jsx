import { useState, useEffect } from "react";
import classes from "./HabitsContainer.module.css";
import useHabit from "../../hooks/useHabit";
import HabitsHeader from "./HabitsHeader";
import { useHabitsContext } from "../../store/HabitsContext";
import { getFormattedDate } from "../../Utils/Utils";
import HabitsList from "./HabitsList";

const HabitsContainer = (props) => {
  const [AllHabits, setAllHabits] = useState([]);
  const habits = useHabit();
  const { habitsList, updateHabitsList } = useHabitsContext();

  useEffect(() => {
    // console.log("rendering HabitsContainer");
    if (habits) {
      // console.info("updating habits data into context");
      updateHabitsList(habits);
      setAllHabits(habits);
    }
  }, [habits]);

  const handleDateChange = (newDate) => {
    const tempHabitsData = [...AllHabits];
    const filteredData = tempHabitsData.filter((habit) => {
      const createdDate = new Date(habit.createdAt.seconds * 1000);
      // getFormattedDate extracts date part in string format
      return new Date(getFormattedDate(createdDate)) <= new Date (newDate);
    });
    updateHabitsList(filteredData);
  };

  return (
    <div className={classes["habits-container"]}>
      <HabitsHeader onDateChange={handleDateChange} />
      <HabitsList habits={habitsList} OnHabitSelect={props.OnHabitSelect}/>
    </div>
  );
};

export default HabitsContainer;
