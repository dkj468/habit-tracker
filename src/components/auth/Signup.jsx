import classes from "./Signup.module.css";
import google from "../../../asset/img//google-xsm.png";


// import { auth, GoogleProider } from "../firebase-config/config";
 import { useNavigate } from "react-router";
import { useAuthContext } from "../../store/AuthContext";
import useInput from "../../hooks/useInput";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const formDefaultValues = {
    userName: "",
    password: ""
  }

const Signup = () => {
  const [error, setError] = useState(undefined);  
  const {value,
    formErrors,
    IsFormValid,
    onChangeHandler,
    onBlurHandler} = useInput(formDefaultValues);
    const navigate = useNavigate();
   const { createUser, signInWithGoogle } = useAuthContext();

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
    e.preventDefault();
    try {
      const user = await createUser(value['userName'], value['password']);
      console.log(user);
      navigate("/");
    } catch(err) {
        console.error(err.message);
        setError(err.message);
    }
  }
    return (
        <div className={classes["home-page-container"]}>
          <h1 className={classes["welcome-txt"]}>Welcome to habit tracker</h1>
          <div className={classes["login-frm-container"]}>
              {error && <div className={classes["form-control-grp"]}>
                <span className={classes.error}>{error}</span>
              </div>}   
            <form className={classes["form-container"]} onSubmit={e => signUpHandler(e)}>
              <div className={classes["form-control-grp"]}>
                <label htmlFor="txt-user">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  id="txt-user"
                  name="userName"
                  value={value['userName']}
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
                  value={value['password']}
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
              <p>Already with us ? <NavLink to="/">Login</NavLink></p>
            </div>
          </div>
        </div>
    )
}

export default Signup;