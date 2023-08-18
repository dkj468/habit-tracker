import classes from "./Home.module.css";
import google from "../../asset/img/google-xsm.png";

import {signInWithPopup} from "firebase/auth";

import {auth, GoogleProider} from "../firebase-config/config";

const Home = () => {

    const signInWithGoogleHandler = async () => {
        try{    
            const user = await signInWithPopup(auth, GoogleProider);
            console.log(user); 
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className={classes['home-page-container']}>
            {/* <img src={logo} alt="logo" className={classes.logo}/> */}
            <div>
                <h2>Sign In To Your Account</h2>
                {/* <span> Don't have an account </span> */}
            </div>
            <div className={classes['sign-up-action']} onClick={signInWithGoogleHandler}>
                <img src={google}></img>
                <span>Continue with Google</span>
            </div>
        </div>
    )
}

export default Home;