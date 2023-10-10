import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config/config";
import { useAuthContext } from "../store/AuthContext";

const useHabit = () => {
  const { user } = useAuthContext();
  const [habits, setHabits] = useState(undefined);

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
        const filteredData = newData.filter((data) => data.userId === user.uid);
        setHabits(filteredData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      console.info("fetching habits data -- hook");
      fetchHabitsData();
    } else {
      console.log("useHabit hook didnot run");
    }
  }, [user]);

  return habits;
};

export default useHabit;
