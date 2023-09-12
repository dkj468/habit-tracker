import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config/config";
import { getFormattedDate } from "../Utils/Utils";

export const HabitsContext = React.createContext();

export default HabitsContextProvider = (props) => {
  const [habitsList, updateHabitsList] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(undefined);
  const [selectedHabitId, setSelectedHabitId] = useState(undefined);
  const [IsAddHabit, SetIsAddHabit] = useState(false);
  const [IsHabitUpdated, setIsHabitUpdated] = useState(false);

  useEffect(() => {
    const fetchHabitsData = async () => {
      try {
        await getDocs(collection(db, "habits")).then((querySnapShot) => {
          const newData = querySnapShot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          updateHabitsList(newData);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchHabitsData();
  }, []);

  useEffect(() => {
    const getHabitsData = async () => {
      try {
        const thisHabitRef = doc(db, "habits", selectedHabitId);
        const docSnap = await getDoc(thisHabitRef);
        if (docSnap) {
          const thisUpdatedHabit = docSnap.data();
          setSelectedHabit({ id: selectedHabitId, ...thisUpdatedHabit });
          console.log(thisUpdatedHabit);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if(selectedHabitId) {
      getHabitsData();
    }
  }, [selectedHabitId, IsHabitUpdated]);

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

  const getFormattedStreakData = (thisHabit) => {
    let streakData = undefined;
    if(thisHabit){
      streakData = thisHabit.data;  
      streakData = streakData?.map((data) => {
        return {
          status: data.status,
          startDate: new Date(data.startDate.seconds * 1000),
        };
      });
    }
    return streakData?.length > 0 ? streakData : undefined;
  }

  const calculateHabitsStreak = () => {
    let streakData = getFormattedStreakData(selectedHabit);
    let streakCount = 0;
    let streakDate = undefined;
    if(streakData) {
      streakData = streakData.sort((a, b) => b.startDate - a.startDate);
      // console.log("streakData = " + JSON.stringify(streakData));

      const indexOfFail = streakData.findIndex((data) => data.status === "fail");
      const indexOfSkip = streakData.findIndex((data) => data.status === "skip");

      // console.log("Fail Index : " + indexOfFail, "Skip Index : " + indexOfSkip);
    

      if (indexOfFail === -1 && indexOfSkip === -1) {
        streakCount = streakData.length;
        streakDate = streakData[streakData.length - 1].startDate;
      } else if (indexOfFail === 0 || indexOfSkip === 0) {
        streakCount = 0;
        streakDate = new Date();
      } else {
        let indexOfLastSuccess = -1;
        if (indexOfFail === indexOfSkip) {
          indexOfLastSuccess = indexOfFail;
        } else if (indexOfFail > indexOfSkip) {
          indexOfLastSuccess = indexOfSkip > 0 ? indexOfSkip : indexOfFail;
        } else {
          indexOfLastSuccess = indexOfFail > 0 ? indexOfFail : indexOfSkip;
        }
        streakCount = indexOfLastSuccess;
        streakDate = streakData[indexOfLastSuccess].startDate;
      }
    }
    return {
      streakCount,
      streakDate,
    };
  };

  const getHabitDataForDate = async (thishabit, thisDate) => {
    let result = undefined;
    // get the new habit data
    try {
      const thisHabitRef = doc(db, "habits", thishabit.id);
      const docSnap = await getDoc(thisHabitRef);
      if (docSnap) {
        const thisUpdatedHabit = docSnap.data();
        thishabit = { id: thishabit.id, ...thisUpdatedHabit }
        // console.log(thisUpdatedHabit);
      }
    } catch (err) {
      console.log(err);
    }
    const streakData = getFormattedStreakData(thishabit);
    result = streakData?.find(el => getFormattedDate(el.startDate) === getFormattedDate(thisDate));
    return result;
  }

  return (
    <HabitsContext.Provider
      value={{
        habitsList,
        selectedHabit,
        IsAddHabit,
        IsHabitUpdated,
        setSelectedHabit,
        SetIsAddHabit,
        setIsHabitUpdated,
        setSelectedHabitId,
        addNewHabit,
        calculateHabitsStreak,
        getHabitDataForDate
      }}
    >
      {props.children}
    </HabitsContext.Provider>
  );
};

export const useHabitsContext = () => {
  return useContext(HabitsContext);
};
