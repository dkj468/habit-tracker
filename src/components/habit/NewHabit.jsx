import { useHabitsContext } from "../../store/HabitsContext";
import Modal from "../UI/Model";
import classes from "./NewHabit.module.css";

const NewHabit = () => {
  const {SetIsAddHabit} = useHabitsContext();
  const onCloseHandler = () => {
    SetIsAddHabit(prevVal => {
      return !prevVal;
    })
  }

  return (
    <Modal onClose= {onCloseHandler}>
      <div className={classes['new-habit-text']}>
        <span>Add New Habit</span>
        <br/>
      </div>
      <form className={classes['form-container']}>
        <div className={classes['form-control-grp']}>
        <label htmlFor="txt-habit">Habit Name</label>
        <input type="text" placeholder="habit name" id="txt-habit"/>
        </div>
        
        <div className={classes['form-control-grp']}>
        <label htmlFor="txt-habit">Start Date</label>
        <input type="date"/>
        </div>
        <div className={classes['form-control-grp-btn']}>
        <button type="submit">Add Habit</button>
        <button type="submit">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewHabit;
