import classes from "./App.module.css";
import HabitDetail from "./components/habit-detail/HabitDetail";

import HabitsContainer from "./components/habits-container/HabitsContainer";
import SideNav from "./components/side-nav/SideNav";
import HabitsContextProvider from "./store/HabitsContext";

const App = () => {
  return (
    <HabitsContextProvider>
      <div className={classes.container}>
        <SideNav />
        <HabitsContainer />
        <HabitDetail />
      </div>
    </HabitsContextProvider>
  );
};

export default App;
