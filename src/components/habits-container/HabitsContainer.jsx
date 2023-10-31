import { useState, useEffect } from "react";
import classes from "./HabitsContainer.module.css";
import useHabit from "../../hooks/useHabit";
import HabitsHeader from "./HabitsHeader";
import { getFormattedDate } from "../../Utils/Utils";
import HabitsList from "./HabitsList";

const HabitsContainer = (props) => {
  const [AllHabits, setAllHabits] = useState([]);
  const habits = useHabit();
  const [habitsList, updateHabitsList ] = useState(undefined);
  const [IsAddHabit, setIsAddHabit] = useState(false);

  const {selectedHabit, OnHabitSelect} = props;

  useEffect(() => {
    console.log("rendering HabitsContainer");
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

  
  const onHabitChange = (thisHabit) => {
    const tempHabits = [...habitsList];
    const habitIndex = tempHabits.findIndex(el => el.id === thisHabit.id);
    if(habitIndex >= 0){
      tempHabits[habitIndex] = thisHabit;
      updateHabitsList(tempHabits);
      if(selectedHabit && (selectedHabit.id === thisHabit.id)) {
        OnHabitSelect(thisHabit);
      }
    }
  }

  const onAddNewHabit = (thisHabit) => {
    const tempHabits = [...habitsList];
    tempHabits.push(thisHabit);
    updateHabitsList(tempHabits);
  }

  return (
    <div className={classes["habits-container"]}>
      <HabitsHeader onDateChange={handleDateChange} OnAddNewHabit={onAddNewHabit} IsAddHabit={IsAddHabit} setIsAddHabit={setIsAddHabit}/>
      <HabitsList selectedHabit = {selectedHabit} habits={habitsList} OnHabitSelect={OnHabitSelect} OnHabitChange={onHabitChange} setIsAddHabit={setIsAddHabit}/>
    </div>
  );
};

export default HabitsContainer;
