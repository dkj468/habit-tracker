import React from "react";
import { FiLogOut } from "react-icons/fi";
import classes from "./SideNav.module.css";
import profile from "../../../asset/img/profile.png";
import allHabits from "../../../asset/img/all-habits.png";
import { useAuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
const SideNav = () => {
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes["side-nav"]}>
      <div className={`${classes.navItem} ${classes.profile}`}>
        <img src={user?.photoURL ? user?.photoURL : profile} />
        <p>
          {user?.displayName ? user?.displayName : user?.email.substring(0, 11)}
        </p>
      </div>

      <div className={`${classes.navItem} ${classes.allHabits}`}>
        <img src={allHabits} />
        <p>All Habits</p>
      </div>
      <div className={classes.navItem} onClick={logoutHandler}>
        <FiLogOut />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default SideNav;
