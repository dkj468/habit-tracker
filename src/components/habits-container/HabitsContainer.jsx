import classes from "./HabitsContainer.module.css";

import HabitsHeader from "./HabitsHeader";
import HabitsList from "./HabitsList";

const HabitsContainer = () => {
  return (
    <div className={classes["habits-container"]}>
      <HabitsHeader />
      <HabitsList />
    </div>
  );
};

export default HabitsContainer;
