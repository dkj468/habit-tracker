import classes from "./HabitStreak.module.css";
import { FaFire } from "react-icons/fa";


const HabitStreak = () => {
    return (
        <div className={classes['streak-container']}>
            <FaFire className={classes['icon-streak']}/>
            <div className={classes['streak-details']}>
                <p className={classes['txt-streak']}>Current Streak</p>
                <p className={classes['txt-streak-count']}>2 days</p>
            </div>
        </div>
    )
}

export default HabitStreak;