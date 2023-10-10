import { getDoc, doc } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config/config";
import { getFormattedDate } from "../Utils/Utils";

export const HabitsContext = React.createContext();

export default HabitsContextProvider = (props) => {

  const addNewHabit = (habit) => {
    const thisNewHabit = {
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
