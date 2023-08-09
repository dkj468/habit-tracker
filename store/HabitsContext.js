import React, { useContext, useEffect } from "react";
import { useState } from "react";


export const HabitsContext = React.createContext();

const HABITS = [
    {
      "id":1,
      "name":"Meditate"
    }, 
    {
      "id":2,
      "name":"Running"
    },
    {
      "id":3,
      "name":"Book Reading"
    },
    {
      "id":4,
      "name":"React learning"
    }
  ];

export default HabitsContextProvider = (props) => {
    const [habitsList, updateHabitsList] = useState([]);
    const [selectedHabit, setSelectedHabit] = useState(undefined);

    useEffect(() => {
        updateHabitsList(HABITS)
    }, []);

    return (
        <HabitsContext.Provider value={{
            habitsList,
            selectedHabit,
            setSelectedHabit
        }}>
            {props.children}
        </HabitsContext.Provider>
    )
}

export const useHabitsContext = () => {
    return useContext(HabitsContext);
};