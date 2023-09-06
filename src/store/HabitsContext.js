import { QuerySnapshot, collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config/config";

export const HabitsContext = React.createContext();

const HABITS = [];

export default HabitsContextProvider = (props) => {
  const [habitsList, updateHabitsList] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(undefined);
  const [IsAddHabit, SetIsAddHabit] = useState(false);

  useEffect(() => {
    const fetchHabitsData = async () => {
      try{
        await getDocs(collection(db, "habits")).then(querySnapShot => {
          const newData = querySnapShot.docs.map(doc => {
            return (
              {
                ...doc.data(),
                id: doc.id
              })
          })
          updateHabitsList(newData);
        })
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchHabitsData();
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
