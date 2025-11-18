import React, { useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { AuthenticationContext } from "./AuthContext";


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) ;
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

 
  const authInfo = {
    user,
    loading, 
    setUser,
    createUserWithEmailAndPasswordFunc: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password),
    signInWithEmailAndPasswordFunc: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),
    signInWithGoogleFunc: () => signInWithPopup(auth, googleProvider),
    signInWithGithubFunc: () => signInWithPopup(auth, githubProvider),
    signOutUserFunc: () => signOut(auth),
    sendPassResetEmailFunc: (email) => sendPasswordResetEmail(auth, email),
    updateProfileFunc: (displayName, photoUrl) =>
      user ? updateProfile(user, { displayName, photoURL: photoUrl }) : null,
  };

  return (
    <AuthenticationContext.Provider value={authInfo}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthProvider;
