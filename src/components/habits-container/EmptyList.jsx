import AddHabit from "../habit/AddHabit";
import classes from "./EmptyList.module.css";
import habits from "../../../asset/img/habits.jpg";

const EmptyList = (props) => {
  const {setIsAddHabit } = props;
  return (
    <div className={classes["empty-list-container"]}>
      <div className={classes["habit-img"]}>
        <img src={habits} />
      </div>
      <div className={classes["empty-list-quote"]}>
        <h4>The start of a better you!</h4>
        <span>
          By developing and practicing good habits each day, you affirm that you
          do have control over the very core of your life in the midst of the
          chaos.
        </span>
      </div>
      <div className={classes["add-habit-btn"]}>
        <AddHabit onAddHabit={setIsAddHabit}/>
      </div>
    </div>
  );
};

export default EmptyList;
