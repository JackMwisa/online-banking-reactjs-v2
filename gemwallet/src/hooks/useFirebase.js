// Firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// React
import { useEffect, useState } from "react";

import initializeAuthentication from "../Firebase/firebase.init";

// Initialize the authentication
initializeAuthentication();

const useFirebase = () => {
  // States for user authentication
  const [user, setUser] = useState(null); // Initializing as null to better handle no user scenario
  const [authState, setAuthState] = useState({
    isLoading: true,
    authError: "",
  });
  const [showPin, setShowPin] = useState(false);

  const auth = getAuth();

  // Sign Up Function
  const registerUser = async (email, password, navigate) => {
    setAuthState({ ...authState, isLoading: true });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setAuthState({ isLoading: false, authError: "" });
      const newUser = { email };
      setUser(newUser);
      navigate("/account-setup");
    } catch (err) {
      setAuthState({ isLoading: false, authError: err.message });
    }
  };

  // Sign In Function
  const logInUser = async (email, password, location, navigate) => {
    setAuthState({ ...authState, isLoading: true, authError: "" });
    setShowPin(false);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const prevDestination = location?.state?.from || "/";
      navigate(prevDestination);

      // Show PIN modal after a delay of 5 seconds
      setTimeout(() => setShowPin(true), 5000);
    } catch (err) {
      setAuthState({ isLoading: false, authError: err.message });
    } finally {
      setAuthState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  // Persistent user state on auth state change
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setAuthState((prevState) => ({ ...prevState, isLoading: false }));
    });

    return () => unsubscribed();
  }, [auth]);

  // SignOut Function
  const logOut = async () => {
    setAuthState({ ...authState, isLoading: true });
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err.message); // Log for debugging but don't show to users
    } finally {
      setAuthState({ isLoading: false, authError: "" });
    }
  };

  return {
    user,
    authState,
    registerUser,
    logInUser,
    logOut,
    showPin,
    setShowPin,
  };
};

export default useFirebase;
