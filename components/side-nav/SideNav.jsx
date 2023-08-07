import classes from "./SideNav.module.css";
import profile from "../../asset/img/profile.png";
import allHabits from "../../asset/img/all-habits.png";
const SideNav = () => {
  return (
    <div className={classes["side-nav"]}>
      <div className={`${classes.navItem} ${classes.profile}`}>
        <img src={profile} />
        <p>Deepak Kumar Jain</p>
      </div>
      <div className={`${classes.navItem} ${classes.allHabits}`}>
        <img src={allHabits} />
        <p>All Habits</p>
      </div>
    </div>
  );
};

export default SideNav;
