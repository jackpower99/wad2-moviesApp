import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'

const AuthContext = createContext({
  currentUser: null,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user ? user : null)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // function getIdToken(){
  //   return auth.currentUser.getIdToken()
  // }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3001/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    return signOut(auth)
  }


  const value = {
    currentUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    //getIdToken
  }


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}