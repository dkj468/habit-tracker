import ReactDOM from "react-dom";
import classes from "./HabitActionList.module.css";

const Overlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const HabitActionList = (props) => {
  const placeHolder = document.getElementById("portal-root");
  return ReactDOM.createPortal(
    <Overlay className={props.classes}>{props.children}</Overlay>,
    placeHolder
  );
};

export default HabitActionList;
