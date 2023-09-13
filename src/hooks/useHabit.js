import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase-config/config";
import { useHabitsContext } from "../store/HabitsContext";
import { useAuthContext } from "../store/AuthContext";

const useHabit = () => {
    const [habits, setHabits] = useState([]);
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
              const filteredData = newData.filter(data => data.userId === user.uid);
              setHabits(filteredData);
            });
          } catch (err) {
            console.log(err);
          }
        };
        if(user) {
            fetchHabitsData();
        }
      }, [user]);
    
      return {habits}; 
}

export default useHabit;