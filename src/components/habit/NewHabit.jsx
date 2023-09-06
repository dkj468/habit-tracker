import {db} from "../../firebase-config/config";
import { getFormattedDate } from "../../Utils/Utils";
import useInput from "../../hooks/useInput";
import { useHabitsContext } from "../../store/HabitsContext";
import Modal from "../UI/Model";
import classes from "./NewHabit.module.css";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useAuthContext } from "../../store/AuthContext";

const formDefaultValues = {
  habitName: "",
  habitDate: getFormattedDate(new Date()),
  habitTime: 0,
};

const NewHabit = () => {
  const {user} = useAuthContext();
  console.log(user);
  const { SetIsAddHabit, addNewHabit } = useHabitsContext();
  const { value, formErrors, IsFormValid, onChangeHandler, onBlurHandler } =
    useInput(formDefaultValues);

  const onCloseHandler = () => {
    SetIsAddHabit((prevVal) => {
      return !prevVal;
    });
  };

  const saveHabitHandler = async (e) => {
    e.preventDefault();
    const newHabit = {
      ...value,
      userId:user.uid,
      createdAt: Timestamp.fromDate(new Date())
    }
    const docRef = await addDoc(collection(db, "habits"), newHabit);
    console.log("Document written with ID: ", docRef.id);
    addNewHabit(value);
    SetIsAddHabit((prevVal) => {
      return !prevVal;
    });
    console.log(value);
    console.log(formErrors);
  };

  const btnClass = IsFormValid
    ? classes["btn-add"]
    : `${classes["btn-add"]} ${classes["disabled"]}`;
  return (
    <Modal onClose={onCloseHandler}>
      <div className={classes["new-habit-text"]}>
        <span>New Habit</span>
      </div>
      <form className={classes["form-container"]} onSubmit={saveHabitHandler}>
        <div className={classes["form-control-grp"]}>
          <label htmlFor="txt-habit">Habit Name</label>
          <input
            type="text"
            placeholder="habit name"
            id="txt-habit"
            name="habitName"
            value={value["habitName"]}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
          {formErrors["habitName"] && (
            <span className={classes["error"]}>{formErrors["habitName"]}</span>
          )}
        </div>

        <div className={classes["form-control-grp"]}>
          <label htmlFor="date-habit">Start Date</label>
          <input
            type="date"
            id="date-habit"
            name="habitDate"
            value={value["habitDate"]}
            onChange={onChangeHandler}
          />
        </div>
        <div className={classes["form-control-grp"]}>
          <label htmlFor="time-habit">Time Of Day</label>
          <select
            id="time-habit"
            name="habitTime"
            value={value["habitTime"]}
            onChange={onChangeHandler}
          >
            <option>Any Time</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>
        <div className={classes["form-control-grp-btn"]}>
          <button
            type="button"
            className={classes["btn-cancel"]}
            onClick={onCloseHandler}
          >
            Cancel
          </button>
          <button type="submit" className={btnClass} disabled={!IsFormValid}>
            Add Habit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewHabit;
