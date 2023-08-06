import classes from "./SideNav.module.css";

const SideNav = () => {
  return (
    <div className={classes["side-nav"]}>
      <div className={classes.navItem}>
        <button>Profile</button>
      </div>
      <div className={classes.navItem}>
        <a href="#">All Habits</a>
      </div>
    </div>
  );
};

export default SideNav;
