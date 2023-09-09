import HabitstatisticsCard from "./HabitstatisticsCard";
import classes from "./HabitstatisticsCardsContainer.module.css";

const HabitstatisticsCardsContainer = () => {
    return (
        <div className={classes['card-container']}>
            <HabitstatisticsCard cardType="done" />
            <HabitstatisticsCard cardType="fail" />
            <HabitstatisticsCard cardType="skip" />
            <HabitstatisticsCard cardType="total" />
        </div>
    )
}

export default HabitstatisticsCardsContainer;