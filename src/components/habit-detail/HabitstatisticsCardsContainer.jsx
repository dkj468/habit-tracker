import HabitstatisticsCard from "./HabitstatisticsCard";
import classes from "./HabitstatisticsCardsContainer.module.css";

const HabitstatisticsCardsContainer = (props) => {
  return (
    <div className={classes["card-container"]}>
      <HabitstatisticsCard cardType="done" selectedHabit={props.selectedHabit} />
      <HabitstatisticsCard cardType="fail" selectedHabit={props.selectedHabit} />
      <HabitstatisticsCard cardType="skip" selectedHabit={props.selectedHabit} />
      <HabitstatisticsCard cardType="total" selectedHabit={props.selectedHabit} />
    </div>
  );
};

export default HabitstatisticsCardsContainer;
