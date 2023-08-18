import classes from "./AppPage.module.css";

import { useHabitsContext } from "../store/HabitsContext";
import HabitDetail from "../components/habit-detail/HabitDetail";
import SideNav from "../components/side-nav/SideNav";
import HabitsContainer from "../components/habits-container/HabitsContainer";
import NewHabit from "../components/habit/NewHabit";

const AppPage = () => {
  const { IsAddHabit } = useHabitsContext();

  return (
    <div className={classes.container}>
      {IsAddHabit && <NewHabit />}
      <SideNav />
      <HabitsContainer />
      <HabitDetail />
    </div>
  );
};

export default AppPage;
