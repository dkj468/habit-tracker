import React, { useContext, useEffect } from "react";
import { useState } from "react";

export const HabitsContext = React.createContext();

const HABITS = [];

export default HabitsContextProvider = (props) => {
  const [habitsList, updateHabitsList] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(undefined);
  const [IsAddHabit, SetIsAddHabit] = useState(false);

  useEffect(() => {
    updateHabitsList(HABITS);
  }, []);

  const getNewId = () => {
    if (habitsList.length === 0) return 1;
    return Math.max(...habitsList.map((x) => x.id)) + 1;
  };
  const addNewHabit = (habit) => {
    const id = getNewId();
    const thisNewHabit = {
      id,
      isDeleted: false,
      isarchived: false,
      ...habit,
    };
    const tempHabits = [...habitsList];
    tempHabits.push(thisNewHabit);
    updateHabitsList(tempHabits);
  };

  return (
    <HabitsContext.Provider
      value={{
        habitsList,
        selectedHabit,
        IsAddHabit,
        setSelectedHabit,
        SetIsAddHabit,
        addNewHabit,
      }}
    >
      {props.children}
    </HabitsContext.Provider>
  );
};

export const useHabitsContext = () => {
  return useContext(HabitsContext);
};
