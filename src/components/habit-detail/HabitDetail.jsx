import classes from "./HabitDetail.module.css";

import { useHabitsContext } from "../../store/HabitsContext";
import HabitQuote from "./HabitQuote";
import HabitDetailHeader from "./HabitDetailHeader";
import HabitStreak from "./HabitStreak";
import HabitstatisticsCardsContainer from "./HabitstatisticsCardsContainer";

const HabitDetail = () => {
  const { selectedHabit } = useHabitsContext();

  const SelectHabitText = () => (
    <p className={classes["text-select-habit"]}>
      Select a habit from list to see details
    </p>
  );

  if (!selectedHabit) {
    return (
      <div className={classes["no-habit-container"]}>
        <SelectHabitText />
        <HabitQuote />
      </div>
    );
  }

  return (
    <div className={classes["habit-detail-container"]}>
      <HabitDetailHeader selectedHabit={selectedHabit} />
      <HabitStreak selectedHabit={selectedHabit} />
      <HabitstatisticsCardsContainer />
    </div>
  );
};

export default HabitDetail;
