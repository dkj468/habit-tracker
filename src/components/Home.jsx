import classes from "./Home.module.css";
import google from "../../asset/img/google-xsm.png";
import goal from "../../asset/img/Goal-1.png";

import { auth, GoogleProider } from "../firebase-config/config";
import { useNavigate } from "react-router";
import { useAuthContext } from "../store/AuthContext";
import useInput from "../hooks/useInput";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const formDefaultValues = {
  userName: "",
  password: "",
};

const Home = () => {
  const [error, setError] = useState(undefined);
  const { value, onChangeHandler } = useInput(formDefaultValues);

  const { user, signInWithGoogle, signInWithUserEmailAndPassword } =
    useAuthContext();

  const navigate = useNavigate();

  if (user && user.emailVerified) {
    return navigate("/journel");
  }

  const signInWithGoogleHandler = async () => {
    try {
      const user = await signInWithGoogle(auth, GoogleProider);
      console.log(user);
      navigate("/journel");
    } catch (error) {
      console.error(error);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    // console.log(value);

    try {
      const user = await signInWithUserEmailAndPassword(
        value["userName"],
        value["password"]
      );
      // console.log(user);
      navigate("/journel");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <>
      <div className={classes["home-page-container"]}>
        <div className={classes["welcome-txt"]}>
          <div className={classes["img-container"]}>
            <img className={classes["img-tracker"]} src={goal} />
          </div>
          <h1>Welcome to habit tracker</h1>
        </div>
        <div className={classes["login-frm-container"]}>
          {error && (
            <div className={classes["form-control-grp"]}>
              <span className={classes.error}>{error}</span>
            </div>
          )}
          <form
            className={classes["form-container"]}
            onSubmit={(e) => loginHandler(e)}
          >
            <div className={classes["form-control-grp"]}>
              <label htmlFor="txt-user">Username</label>
              <input
                type="text"
                placeholder="Username"
                id="txt-user"
                name="userName"
                value={value["userName"]}
                onChange={onChangeHandler}
              />
            </div>

            <div className={classes["form-control-grp"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={value["password"]}
                onChange={onChangeHandler}
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
            <p>
              Don't have an account yet ? <NavLink to="/signup">Signup</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
