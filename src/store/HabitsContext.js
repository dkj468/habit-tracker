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
  // const [IsHabitUpdated, setIsHabitUpdated] = useState(false)

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

  const calculateHabitsStreak = () => {
    let streakData = selectedHabit.data;
    streakData = streakData.map(data => {
        return {
            status: data.status,
            startDate: new Date(data.startDate.seconds*1000)
        }
    });

    streakData = streakData.sort((a,b) => b.startDate - a.startDate);
    console.log("streakData = " + JSON.stringify(streakData) );
    
    const indexOfFail = streakData.findIndex(data => data.status === 'fail');
    const indexOfSkip = streakData.findIndex(data => data.status === 'skip');

    console.log("Fail Index : " + indexOfFail, "Skip Index : " + indexOfSkip);
    let streakCount = 0;
    let streakDate = undefined;
    
    if(indexOfFail == -1 && indexOfSkip == -1)  {
        streakCount = streakData.length;
        streakDate = streakData[streakData.length - 1].startDate;
    } else if (indexOfFail == 0 || indexOfSkip == 0 ) {
        streakCount = 0;
        streakDate = new Date();
    } else {
        let indexOfLastSuccess = -1;
        if(indexOfFail === indexOfSkip) {
            indexOfLastSuccess = indexOfFail;
        } else if(indexOfFail > indexOfSkip) {
            indexOfLastSuccess = indexOfSkip;
        } else {
            indexOfLastSuccess = indexOfFail;
        }
        streakCount = indexOfLastSuccess;
        streakDate = streakData[indexOfLastSuccess].startDate;
    }

    return {
      streakCount, streakDate
    }
  }

  return (
    <HabitsContext.Provider
      value={{
        habitsList,
        selectedHabit,
        IsAddHabit,
        setSelectedHabit,
        SetIsAddHabit,
        addNewHabit,
        calculateHabitsStreak
      }}
    >
      {props.children}
    </HabitsContext.Provider>
  );
};

export const useHabitsContext = () => {
  return useContext(HabitsContext);
};
