import ReactDOM from "react-dom";
import classes from "./Model.module.css";

const Backdrop = (props) => {
  // console.log(props);
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Overlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const Modal = (props) => {
  const placeHolder = document.getElementById("portal-root");
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, placeHolder)}
      {ReactDOM.createPortal(
        <Overlay> {props.children} </Overlay>,
        placeHolder
      )}
    </>
  );
};

export default Modal;
