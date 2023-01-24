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
    const musclesDictionary=(muscle)=>{
      let result=[]
      switch(muscle){
        case "all":
          result=["pectoralis major" ,"biceps" ,"abdominals" ,"sartorius" ,"abductors" ,"trapezius" ,"deltoid" ,"latissimus dorsi" ,"serratus anterior" ,"external oblique" ,"brachioradialis" ,"finger extensors" ,"finger flexors" ,"quadriceps" ,"hamstrings" ,"gastrocnemius" ,"soleus" ,"infraspinatus" ,"teres major" ,"triceps" ,"gluteus medius" ,"gluteus maximus"]
          break;
        case "all_lower":
          result=['abductors' ,'sartorius' ,'gastrocnemius' ,'soleus' ,'gluteus maximus' ,'gluteus medius' ,'hamstrings' ,'quadriceps']
          break;
        case "all_upper":
          result=["pectoralis major" ,"biceps" ,"abdominals" ,"abductors" ,"trapezius" ,"deltoid" ,"latissimus dorsi" ,"serratus anterior" ,"external oblique" ,"brachioradialis" ,"finger extensors" ,"finger flexors" ,"infraspinatus" ,"teres major" ,"triceps"]
          break;
        case "legs":
          result=['abductors' ,'sartorius' ,'gastrocnemius' ,'soleus' ,'hamstrings' ,'quadriceps']
          break;
        case "abductors":
          result=['abductors']
          break;
        case "abs":
          result=['abdominals']
          break;
        case "adductors":
          result=['sartorius' ]
          break;
        case "back":
          result=["trapezius" ,"latissimus dorsi" ,"teres major"]
          break;
        case "back_upper":
          result=["trapezius" ,"teres major"]
          break;
        case "biceps":
          result=['biceps']
          break;
        case "calfs":
          result=['gastrocnemius' ,'soleus']
          break;
        case "chest":
          result=['pectoralis major']
          break;
        case "core":
          result=["serratus anterior","external oblique","abdominals"]
          break;
        case "core_lower":
          result=['external oblique']
          break;
        case "core_upper":
          result=['serratus anterior']
          break;
        case "forearms":
          result=['brachioradialis' ,"finger extensors" ,"finger flexors"]
          break;
        case "gluteus":
          result=['gluteus maximus' ,'gluteus medius']
          break;
        case "hamstring":
          result=['hamstrings']
          break;
        case "latissimus":
          result=['latissimus dorsi']
          break;
        case "neck":
          result=['trapezius']
          break;
        case "quadriceps":
          result=['quadriceps']
          break;
        case "shoulders":
          result=['deltoid']
          break;
        case "shoulders_back":
          result=['infraspinatus']
          break;
        case "triceps":
          result=['triceps']
          break;
        default:alert('no info over this muscle yet')
      }
      return result
    }
    const muscles=[
      "all",
      "all_lower",
      "all_upper",
      "abductors",
      "abs",
      "adductors",
      "back",
      "back_upper",
      "biceps",
      "calfs",
      "chest",
      "core",
      "core_lower",
      "core_upper",
      "forearms",
      "gluteus",
      "hamstring",
      "latissimus",
      "legs",
      "neck",
      "quadriceps",
      "shoulders",
      "shoulders_back",
      "triceps"
    ]
    const [user ,setUser]=useState(JSON.parse(localStorage.getItem('user')) || emptyUserOBJ)
    const [codeShown ,setCodeShown]=useState(true)
    const [error ,setError]=useState(null)
    const [isLoading ,setIsLoading]=useState(false)
    const [signUpPasswordKeys ,setSignUpPasswordKeys]=useState('')
    const [searchParams ,setSearchParams]=useSearchParams({})
    const [nameSearch ,setNameSearch]=useState('')
    const [exercises ,setExercises]=useState([])
    const [musclesLeft ,setMusclesLeft]=useState([])
    const [isSearchingPrimary ,setIsSearchingPrimary]=useState(true)
    const [muscleSearch ,setMuscleSearch]=useState('')
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
    if(isLoading) return
    setIsLoading(true)
    try{
      const data=await signInWithEmailAndPassword(auth ,emailRef.current.value ,signInPasswordRef.current.value)
      createUser(data)
    }catch(err){
      errorOccurred(err.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  const handleSignUp=async()=>{
    if(isLoading) return
    setIsLoading(true)
    try{
      const data=await createUserWithEmailAndPassword(auth ,emailRef.current.value ,signUpPasswordKeys)
      createUser(data)
    }catch(err){
      errorOccurred(err.message)
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
const getExercises=async(input)=>{
  if(isLoading) return
  setMusclesLeft([])
  setIsLoading(true)
  api.defaults.params=input
  if(input.length){
    const muscleType=input[0]
    const params={}
    const muscles=musclesDictionary(input[1])
    muscleType==='P' ? params.primaryMuscle=muscles[0] : params.secondaryMuscle=muscles[0]
    api.defaults.params=params
    setMusclesLeft(muscles.slice(1))
  }
try{
  const data=await api.get('https://exerciseapi3.p.rapidapi.com/search/')
  errorOccurred('we store no exercises over this muscle')
  setExercises(data.data)
}catch(err){
  errorOccurred(err.message)
}finally{
  setIsLoading(false)
}
}
const moreExercises=async()=>{
  if(isLoading) return
  setIsLoading(true)
  const wantedMuscle=musclesLeft[0]
  const params={}
  isSearchingPrimary ? params.primaryMuscle=wantedMuscle : params.secondaryMuscle=wantedMuscle
  api.defaults.params=params
  try{
    const data=await api.get('https://exerciseapi3.p.rapidapi.com/search/')
    if(data.data.length){
      errorOccurred('we store no exercises over this muscle')
    }
    setExercises([...exercises ,...data.data])
    setMusclesLeft(prev=>{
      const newArr=prev.slice(1)
      return newArr
    })
  }catch(err){
    errorOccurred(err.message)
  }finally{
    setIsLoading(false)
  }
}
return(
    <DataContext.Provider value={{
        user ,signOut ,setUser ,UserToLocalStorage ,codeShown ,setCodeShown ,emailRef ,signInPasswordRef ,handleSignUp ,handleSignIn ,passwordCheck ,signUpPasswordKeys ,setSignUpPasswordKeys ,navigator ,error ,setError ,isLoading ,searchParams ,setSearchParams ,muscles ,getExercises ,exercises ,setExercises ,nameSearch ,setNameSearch ,musclesLeft ,isSearchingPrimary ,setIsSearchingPrimary ,muscleSearch ,setMuscleSearch ,moreExercises
    }}>
        {children}
    </DataContext.Provider>
)
}

export default DataContext