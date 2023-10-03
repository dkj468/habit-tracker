import { getDoc, doc } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase-config/config";
import { getFormattedDate } from "../Utils/Utils";

export const HabitsContext = React.createContext();

export default HabitsContextProvider = (props) => {
  const [habitsList, updateHabitsList] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(undefined);
  const [selectedHabitId, setSelectedHabitId] = useState(undefined);
  const [IsHabitUpdated, setIsHabitUpdated] = useState(false);

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
    if (selectedHabitId || IsHabitUpdated) {
      console.log("running habit context");
      getHabitsData();
    }
  }, [selectedHabitId, IsHabitUpdated]);

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

  const getFormattedStreakData = (thisHabit) => {
    let streakData = undefined;
    if (thisHabit) {
      streakData = thisHabit.data;
      streakData = streakData?.map((data) => {
        return {
          status: data.status,
          startDate: new Date(data.startDate.seconds * 1000),
        };
      });
    }
    return streakData?.length > 0 ? streakData : undefined;
  };

  const calculateHabitsStreak = () => {
    let streakData = getFormattedStreakData(selectedHabit);
    let streakCount = 0;
    let streakDate = undefined;
    if (streakData) {
      streakData = streakData.sort((a, b) => b.startDate - a.startDate);
      // console.log("streakData = " + JSON.stringify(streakData));

      const indexOfFail = streakData.findIndex(
        (data) => data.status === "fail"
      );
      const indexOfSkip = streakData.findIndex(
        (data) => data.status === "skip"
      );

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
        thishabit = { id: thishabit.id, ...thisUpdatedHabit };
        // console.log(thisUpdatedHabit);
      }
    } catch (err) {
      console.log(err);
    }
    const streakData = getFormattedStreakData(thishabit);
    result = streakData?.find(
      (el) => getFormattedDate(el.startDate) === getFormattedDate(thisDate)
    );
    return result;
  };

  return (
    <HabitsContext.Provider
      value={{
        habitsList,
        selectedHabit,
        IsHabitUpdated,
        setSelectedHabit,
        setIsHabitUpdated,
        setSelectedHabitId,
        addNewHabit,
        calculateHabitsStreak,
        getHabitDataForDate,
        updateHabitsList,
      }}
    >
      {props.children}
    </HabitsContext.Provider>
  );
};

export const useHabitsContext = () => {
  return useContext(HabitsContext);
};
