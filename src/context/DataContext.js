import { createContext, useRef, useState } from "react";
import {auth} from '../Config'
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate, useSearchParams} from "react-router-dom";
import api from "../api/api";

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
    const muscles=[
      "pectoralis major",
      "biceps",
      "abdominals",
      "sartorius",
      "abductors",
      "trapezius",
      "deltoid",
      "latissimus dorsi",
      "serratus anterior",
      "external oblique",
      "brachioradialis",
      "finger extensors",
      "finger flexors",
      "quadriceps",
      "hamstrings",
      "gastrocnemius",
      "soleus",
      "infraspinatus",
      "teres major",
      "triceps",
      "gluteus medius",
      "gluteus maximus"
    ]
    const [user ,setUser]=useState(JSON.parse(localStorage.getItem('user')) || emptyUserOBJ)
    const [codeShown ,setCodeShown]=useState(true)
    const [error ,setError]=useState(null)
    const [isLoading ,setIsLoading]=useState(false)
    const [signUpPasswordKeys ,setSignUpPasswordKeys]=useState('')
    const [searchParams ,setSearchParams]=useSearchParams({})
    const [nameSearch ,setNameSearch]=useState('')
    const [exercises ,setExercises]=useState([])
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
    setIsLoading(true)
    try{
      const data=await signInWithEmailAndPassword(auth ,emailRef.current.value ,signInPasswordRef.current.value)
      createUser(data)
    }catch(err){
      errorOccurred(err.code)
    }
    finally{
      setIsLoading(false)
    }
  }
  const handleSignUp=async()=>{
    setIsLoading(true)
    try{
      const data=await createUserWithEmailAndPassword(auth ,emailRef.current.value ,signUpPasswordKeys)
      createUser(data)
    }catch(err){
      errorOccurred(err.code)
    }
    finally{
    setIsLoading(false)
    }
}
const errorOccurred=(err)=>{
  setError(err)
  setTimeout(()=>{
  setError(null)
  },3000)
}
const getExercises=async(params)=>{
  setIsLoading(true)
try{
  api.defaults.params=params
  const data=await api.get('https://exerciseapi3.p.rapidapi.com/search/')
  setExercises(data.data)
}catch(err){
  setError(err.data)
}finally{
  setIsLoading(false)
}
}
return(
    <DataContext.Provider value={{
        user ,signOut ,setUser ,UserToLocalStorage ,codeShown ,setCodeShown ,emailRef ,signInPasswordRef ,handleSignUp ,handleSignIn ,passwordCheck ,signUpPasswordKeys ,setSignUpPasswordKeys ,navigator ,error ,setError ,isLoading ,searchParams ,setSearchParams ,muscles ,getExercises ,exercises ,setExercises ,nameSearch ,setNameSearch
    }}>
        {children}
    </DataContext.Provider>
)
}

export default DataContext