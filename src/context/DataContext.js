import { createContext, useRef, useState } from "react";
import {auth} from '../Config'
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from "react-router-dom";

const DataContext=createContext({})

export const DataProvider=({children})=>{
    //logic
    const emptyUserOBJ={
      userName:null,
      userEmail:null,
      userPhoto:null,
      userGender:'male',
      userId:null
    }
    const [user ,setUser]=useState(JSON.parse(localStorage.getItem('user')) || emptyUserOBJ)
    const [codeShown ,setCodeShown]=useState(true)
    const [error ,setError]=useState(null)
    const [smlLoad ,setSmlLoad]=useState(false)
    const [signUpPasswordKeys ,setSignUpPasswordKeys]=useState('')
    const emailRef=useRef()
    const passwordCheck=useRef()
    const signInPasswordRef=useRef()
    const navigator=useNavigate()
    //functions
    const createUser=(data)=>{
      const userOBJ={
        ...user,
        userName:data.user.displayName ? data.user.displayName : data.user.email.split('@')[0],
        userEmail:data.user.email,
        userPhoto:data.user.photoURL,
        userId:data.user.uid
      }
      localStorage.setItem('user' ,JSON.stringify(userOBJ))
      setUser(userOBJ)
    }
  const signOut=()=>{
      localStorage.removeItem('user')
      setUser(emptyUserOBJ)
  }
  const UserToLocalStorage=()=>{
    localStorage.setItem('user' ,JSON.stringify(user))
  }
  const handleSignIn=async()=>{
    setSmlLoad(true)
    try{
      const data=await signInWithEmailAndPassword(auth ,emailRef.current.value ,signInPasswordRef.current.value)
      createUser(data)
    }catch(err){
      errorOccurred(err.message)
    }
    finally{
      setSmlLoad(false)
    }
  }
  const handleSignUp=async()=>{
    setSmlLoad(true)
    try{
      const data=await createUserWithEmailAndPassword(auth ,emailRef.current.value ,signUpPasswordKeys)
      createUser(data)
    }catch(err){
      errorOccurred(err)
    }
    finally{
    setSmlLoad(false)
    }
}
const errorOccurred=(err)=>{
  setError(err)
  setTimeout(()=>{
  setError(null)
  },4000)
}
return(
    <DataContext.Provider value={{
        user ,signOut ,setUser ,UserToLocalStorage ,codeShown ,setCodeShown ,emailRef ,signInPasswordRef ,handleSignUp ,handleSignIn ,passwordCheck ,signUpPasswordKeys ,setSignUpPasswordKeys ,navigator ,error ,setError ,smlLoad
    }}>
        {children}
    </DataContext.Provider>
)
}

export default DataContext