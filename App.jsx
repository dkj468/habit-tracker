import classes from "./App.module.css";
import HabitDetail from "./components/habit-detail/HabitDetail";

import HabitsContainer from "./components/habits-container/HabitsContainer";
import SideNav from "./components/side-nav/SideNav";

const App = () => {
  return (
    <div className={classes.container}>
      <SideNav />
      <HabitsContainer />
      <HabitDetail />
    </div>
  );
};

export default App;
