import classes from "./AddHabit.module.css";

import { BsPlus } from "react-icons/bs";
import { useHabitsContext } from "../../store/HabitsContext";

const AddHabit = (props) => {
  // const { SetIsAddHabit } = useHabitsContext();

  const addHabitHandler = () => {
    props.onAddHabit(true);
  };
  return (
    <div className={classes["habit-add"]} onClick={addHabitHandler}>
      <BsPlus className={classes["habit-add-icon"]} />
      <p className={classes["txt-add-habit"]}>Add Habit</p>
    </div>
  );
};

export default AddHabit;
