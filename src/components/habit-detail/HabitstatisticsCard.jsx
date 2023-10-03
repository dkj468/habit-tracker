import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { BsArrowRight } from "react-icons/bs";

import classes from "./HabitstatisticsCard.module.css";
import { useHabitsContext } from "../../store/HabitsContext";

const HabitstatisticsCard = (props) => {
  const cardType = props.cardType;
  const selectedHabit = props.selectedHabit;

  let cardHeader = undefined;
  let days = selectedHabit.data?.filter((x) => x.status === cardType).length;
  if (cardType === "done") {
    cardHeader = (
      <span className={classes["card-header"]}>
        <TiTick /> Complete
      </span>
    );
  } else if (cardType === "fail") {
    cardHeader = (
      <span className={classes["card-header"]}>
        <RxCross2 /> Failed
      </span>
    );
  } else if (cardType === "skip") {
    cardHeader = (
      <span className={classes["card-header"]}>
        <BsArrowRight /> Skipped
      </span>
    );
  } else if (cardType === "total") {
    cardHeader = <span className={classes["card-header"]}>Total</span>;
    days = selectedHabit.data?.length;
  }

  return (
    <div className={classes["statistics-card"]}>
      {cardHeader}
      <span className={classes["txt-days"]}>{days ? days : 0} Days</span>
    </div>
  );
};

export default HabitstatisticsCard;
