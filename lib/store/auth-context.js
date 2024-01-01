"use client";

import { createContext } from "react";

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'


export const authContext = createContext({
 user: null,
 loading: false,
 googleLoginHandler: async () => {},
 logout: async () => {},
})


export default function AuthContextProvider({ children }) {
 
 

 const [user, loading] = useAuthState(auth);

 // signing in to the app
 const googleProvider = new GoogleAuthProvider(auth);
 const googleLoginHandler = async () => {
  try {
   await signInWithPopup(auth, googleProvider)
  } catch (error) {
   throw error;
  }
 }

 // logout
 const logout = async () => {
  signOut(auth);
 }

 const allValues = {
  user,
  loading,
  googleLoginHandler,
  logout,
 }
 
 return <authContext.Provider value={allValues}>
  {children}
 </authContext.Provider>
}