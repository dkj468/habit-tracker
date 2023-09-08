import classes from "./HabitStreak.module.css";
import { FaFire } from "react-icons/fa";


const HabitStreak = (props) => {
    const selectedHabit = props.selectedHabit;
    let streakData = selectedHabit.data;
    streakData = streakData.map(data => {
        return {
            status: data.status,
            startDate: new Date(data.startDate.seconds*1000)
        }
    });

    streakData = streakData.sort((a,b) => b.startDate - a.startDate);
    console.log("streakData = " + JSON.stringify(streakData) );
    
    const indexOfFail = streakData.findIndex(data => data.status === 'fail');
    const indexOfSkip = streakData.findIndex(data => data.status === 'skip');

    console.log("Fail Index : " + indexOfFail, "Skip Index : " + indexOfSkip);
    let streakCount = 0;
    let streakDate = undefined;
    
    if(indexOfFail == -1 && indexOfSkip == -1)  {
        streakCount = streakData.length;
        streakDate = streakData[0].startDate;
    } else if (indexOfFail == 0 || indexOfSkip == 0 ) {
        streakCount = 0;
        streakDate = new Date();
    } else {
        let indexOfLastSuccess = -1;
        if(indexOfFail === indexOfSkip) {
            indexOfLastSuccess = indexOfFail;
        } else if(indexOfFail > indexOfSkip) {
            indexOfLastSuccess = indexOfSkip;
        } else {
            indexOfLastSuccess = indexOfFail;
        }
        streakCount = indexOfLastSuccess;
    }


    return (
        <div className={classes['streak-container']}>
            <FaFire className={classes['icon-streak']}/>
            <div className={classes['streak-details']}>
                <p className={classes['txt-streak']}>Current Streak</p>
                <p className={classes['txt-streak-count']}>{streakCount} days</p>
            </div>
        </div>
    )
}

export default HabitStreak;