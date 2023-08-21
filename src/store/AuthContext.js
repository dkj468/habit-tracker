import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleProider, auth } from "../firebase-config/config";
import { setuid } from "process";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
        console.log("no logged in user found");
      }
    });

    // return () => {
    //   unsubscribe();
    // };
  }, []);

  const signInWithGoogle = () => {
    return signInWithPopup(auth, GoogleProider)
  }

  const signInWithUserEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email,password);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithUserEmailAndPassword, createUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
