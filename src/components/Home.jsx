import classes from "./Home.module.css";
import google from "../../asset/img/google-xsm.png";

import { signInWithPopup } from "firebase/auth";

import { auth, GoogleProider } from "../firebase-config/config";
import { Navigate, useNavigate } from "react-router";
import { useAuthContext } from "../store/AuthContext";

const Home = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/journel" />;
  }
  const navigate = useNavigate();

  const signInWithGoogleHandler = async () => {
    try {
      const user = await signInWithPopup(auth, GoogleProider);
      console.log(user);
      navigate("/journel");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes["home-page-container"]}>
        <h1 className={classes["welcome-txt"]}>Welcome to habit tracker</h1>
        <div className={classes["login-frm-container"]}>
          <form className={classes["form-container"]}>
            <div className={classes["form-control-grp"]}>
              <label htmlFor="txt-user">Username</label>
              <input
                type="text"
                placeholder="Username"
                id="txt-user"
                name="userName"
              />
            </div>

            <div className={classes["form-control-grp"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className={classes["form-control-grp-btn"]}>
              <button type="submit" className={classes["btn-add"]}>
                Login
              </button>
            </div>
          </form>
          <div
            className={classes["sign-up-action"]}
            onClick={signInWithGoogleHandler}
          >
            <img src={google}></img>
            <span>Continue with Google</span>
          </div>
          <div className={classes["signup-txt"]}>
            <p>Don't have an account yet ? Signup</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
