import classes from "./AddHabit.module.css";

import { BsPlus } from "react-icons/bs";

const AddHabit = (props) => {
  
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
