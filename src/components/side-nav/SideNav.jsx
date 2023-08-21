import classes from "./SideNav.module.css";
import profile from "../../../asset/img/profile.png";
import allHabits from "../../../asset/img/all-habits.png";
import { useAuthContext } from "../../store/AuthContext";
const SideNav = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className={classes["side-nav"]}>
      <div className={`${classes.navItem} ${classes.profile}`}>
        <img src={user?.photoURL ? user?.photoURL : profile} />
        <p>{user?.displayName}</p>
      </div>

      <div className={`${classes.navItem} ${classes.allHabits}`}>
        <img src={allHabits} />
        <p>All Habits</p>
      </div>
    </div>
  );
};

export default SideNav;
