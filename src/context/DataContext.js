import { createContext, useRef, useState } from "react";
import {auth ,provider} from '../Config'
import {signInWithPopup} from 'firebase/auth'

const DataContext=createContext({})

export const DataProvider=({children})=>{
    //logic
    const [user ,setUser]=useState(JSON.parse(localStorage.getItem('user')) || {
        userName:null,
        userEmail:null,
        userPhoto:null,
        userId:null
      })
    const [codeShown ,setCodeShown]=useState(false)
    const [passwordKeys ,setPasswordKeys]=useState('')
    const emailRef=useRef()
    const passwordCheck=useRef()
    const passwordRef=useRef()
    const handleSignInGoogle=async()=>{
    const data=await signInWithPopup(auth ,provider)
    const userOBJ={
      userName:data.user.displayName,
      userEmail:data.user.email,
      userPhoto:data.user.photoURL,
      userId:data.user.uid
    }
    localStorage.setItem('user' ,JSON.stringify(userOBJ))
    setUser(userOBJ)
  }
  const signOut=()=>{
      localStorage.removeItem('user')
      setUser({
          userName:null,
          userEmail:null,
          userPhoto:null,
          userId:null
      })
  }
  const UserToLocalStorage=()=>{
    localStorage.setItem('user' ,JSON.stringify(user))
  }
  const handleSignIn=()=>{
    const OBJ={
        email:emailRef.current.value,
        password:passwordKeys
    }
    console.log(OBJ)
}
return(
    <DataContext.Provider value={{
        user ,handleSignInGoogle ,signOut ,setUser ,UserToLocalStorage ,codeShown ,setCodeShown ,emailRef ,passwordRef ,handleSignIn ,passwordCheck ,passwordKeys ,setPasswordKeys
    }}>
        {children}
    </DataContext.Provider>
)
}

export default DataContext