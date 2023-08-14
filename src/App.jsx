import classes from "./App.module.css";

import HabitDetail from "./components/habit-detail/HabitDetail";
import NewHabit from "./components/habit/NewHabit";
import HabitsContainer from "./components/habits-container/HabitsContainer";
import SideNav from "./components/side-nav/SideNav";
import HabitsContextProvider, { useHabitsContext } from "./store/HabitsContext";

const App = () => {
  const { IsAddHabit } = useHabitsContext();
  return (
    <div className={classes.container}>
      {<NewHabit />}
      <SideNav />
      <HabitsContainer />
      <HabitDetail />
    </div>
  );
};

export default App;
