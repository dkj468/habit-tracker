import HabitstatisticsCard from "./HabitstatisticsCard";
import classes from "./HabitstatisticsCardsContainer.module.css";

const HabitstatisticsCardsContainer = () => {
    return (
        <div className={classes['card-container']}>
            <HabitstatisticsCard type="complete" />
            <HabitstatisticsCard type="fail" />
            <HabitstatisticsCard type="skip" />
            <HabitstatisticsCard type="total" />
        </div>
    )
}

export default HabitstatisticsCardsContainer;