import classes from './HabitsList.module.css';

import Habit from "./Habit";
import { useHabitsContext } from '../../store/HabitsContext';


const HabitsList = () => {
  const {habitsList} = useHabitsContext();
  console.log(habitsList);
  return (
    <div className={classes['habit-list']}>
      {
        habitsList.map(habit => {
          return (
            <Habit habit={habit} key={habit.id}/>
          )
        })
      }
    </div>
  );
};

export default HabitsList;
