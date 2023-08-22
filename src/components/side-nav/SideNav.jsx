import React from "react";
import classes from "./SideNav.module.css";
import profile from "../../../asset/img/profile.png";
import allHabits from "../../../asset/img/all-habits.png";
import { useAuthContext } from "../../store/AuthContext";
import { useState } from "react";
import Popup from "reactjs-popup";
const SideNav = () => {
  const [showActions, setShowActions] = useState(false);
  const { user } = useAuthContext();
  // console.log(user);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setShowActions((prev) => {
      return !prev;
    });
  };

  const CustomButton = React.forwardRef(({ open, ...props }, ref) => (
    // <button className="button" ref={ref} {...props}>
    //   Trigger - {props.open ? "Opened" : "Closed"}
    // </button>
    <div
      className={`${classes.navItem} ${classes.profile}`}
      // onClick={(e) => handleProfileClick(e)}
      ref={ref}
      {...props}
    >
      <img src={user?.photoURL} />
      <p>{user?.displayName}</p>
    </div>
  ));

  return (
    <div className={classes["side-nav"]}>
      {/* <Popup
        trigger={(open) => {
          <div
            className={`${classes.navItem} ${classes.profile}`}
            onClick={(e) => handleProfileClick(e)}
          >
            <img src={user?.photoURL} />
            <p>{user?.displayName}</p>
          </div>;
        }}
        position="right center"
        closeOnDocumentClick
      >
        <span> Popup content </span>
      </Popup> */}
      <Popup
        trigger={(showActions) => <CustomButton open={showActions} />}
        position="bottom right"
        closeOnDocumentClick
      >
        <div className={classes["profile-actions"]}>
          <div className={classes["profile-action"]}>
            <p>Profile</p>
          </div>
          <div className={classes["profile-action"]}>
            <p>Logout</p>
          </div>
        </div>
      </Popup>
      <div className={`${classes.navItem} ${classes.allHabits}`}>
        <img src={allHabits} />
        <p>All Habits</p>
      </div>
    </div>
  );
};

export default SideNav;
