import classes from "./Home.module.css";
import google from "../../asset/img/Google-logo.png";

const Home = () => {
    return (
        <div className={classes['home-page-container']}>
            {/* <img src={logo} alt="logo" className={classes.logo}/> */}
            <div>
                <h2>Sign In To Your Account</h2>
                {/* <span> Don't have an account </span> */}
            </div>
            <div className={classes['sign-up-action']}>
                <img src={google}></img>
                <span>Continue with Google</span>
            </div>
        </div>
    )
}

export default Home;