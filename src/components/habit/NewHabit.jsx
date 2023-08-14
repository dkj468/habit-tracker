import Modal from "../UI/Model";
import classes from "./NewHabit.module.css";

const NewHabit = () => {
  return (
    <Modal>
      <form>
        <input type="text" placeholder="habit name" />
        <input type="date" placeholder="start date" />
        <button type="submit">Add Habit</button>
      </form>
    </Modal>
  );
};

export default NewHabit;
