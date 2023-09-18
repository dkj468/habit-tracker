import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config/config";
import { useHabitsContext } from "../store/HabitsContext";
import { useAuthContext } from "../store/AuthContext";

const useHabit = () => {
    const [habits, setHabits] = useState(undefined);
    const {user} = useAuthContext();

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
          // filter data based on logged in user
          const filteredData = newData.filter(
            (data) => data.userId === user.uid
          );
          setHabits(filteredData);
        });
      } catch (err) {
        console.log(err);
      }
      return habits;
    };
    if (user) {
      fetchHabitsData();
    }
  }, []);
};

export default useHabit;
