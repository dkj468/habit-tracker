import classes from "./Signup.module.css";
import google from "../../../asset/img//google-xsm.png";
import goal from "../../../asset/img//Goal-1.png";

// import { auth, GoogleProider } from "../firebase-config/config";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../store/AuthContext";
import useInput from "../../hooks/useInput";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const formDefaultValues = {
  userName: "",
  password: "",
};

const Signup = () => {
  const [error, setError] = useState(undefined);
  const [IsEmailSend, setIsEmailSend] = useState(false);
  const { value, formErrors, IsFormValid, onChangeHandler, onBlurHandler } =
    useInput(formDefaultValues);
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, userVerificationEmail } =
    useAuthContext();

  const signInWithGoogleHandler = async () => {
    try {
      const user = await signInWithGoogle(auth, GoogleProider);

      console.log(user);
      navigate("/journel");
    } catch (error) {
      console.error(error);
    }
  };

  const signUpHandler = async (e) => {
    setIsEmailSend(false);
    setError('');
    e.preventDefault();
    try {
      const userCredentials = await createUser(value["userName"], value["password"]);
      console.log(userCredentials);
      await userVerificationEmail(userCredentials.user);
      setIsEmailSend(true);
      //navigate("/");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };
  return (
    <div className={classes["home-page-container"]}>
      <div className={classes["welcome-txt"]}>
        <div className={classes['img-container']}>
        <img className={classes['img-tracker']} src={goal} />
        </div>
        <h1>Welcome to habit tracker</h1>
      </div>
      <div className={classes["login-frm-container"]}>
        {error && (
          <div className={classes["form-control-grp"]}>
            <span className={classes.error}>{error}</span>
          </div>
        )}
        {IsEmailSend && (
          <div className={classes["form-control-grp"]}>
            <span className={classes.info}>
              An email has been sent to your email id. Please click on the link
              provided and verify your email address.
            </span>
          </div>
        )}
        <form
          className={classes["form-container"]}
          onSubmit={(e) => signUpHandler(e)}
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
              Signup
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
            Already with us ? <NavLink to="/">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
