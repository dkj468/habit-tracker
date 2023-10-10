import classes from "./AppPage.module.css";

import { useAuthContext } from "../store/AuthContext";
import HabitDetail from "../components/habit-detail/HabitDetail";
import SideNav from "../components/side-nav/SideNav";
import HabitsContainer from "../components/habits-container/HabitsContainer";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const AppPage = () => {
  const { user } = useAuthContext();
  const [selectedHabit, setSelectedHabit] = useState(undefined);

  const onHabitSelect = (thisHabit) => {
    setSelectedHabit (thisHabit);
  }
  //console.log(user);
  const navigate = useNavigate();
  if (!user) {
    <Navigate to={"/"} />;
  }
  return (
    <div className={classes.container}>
      {/* {IsAddHabit && <NewHabit />} */}
      <SideNav />
      <HabitsContainer OnHabitSelect = {onHabitSelect} selectedHabit= {selectedHabit}/>
      <HabitDetail selectedHabit= {selectedHabit}/>
    </div>
  );
};

export default AppPage;
