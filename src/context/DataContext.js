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
    const dictionary={}
    const musclesDictionaryFunc=(muscle)=>{
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
    const [exercises ,setExercises]=useState([
      {
          "Force": "push",
          "Name": "Barbell Bench Press",
          "Primary Muscles": [
              "deltoid",
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "triceps"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=rT7DgCr-3pg&t=29s&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Dumbbell Bench Press",
          "Primary Muscles": [
              "deltoid",
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "triceps"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=Y_7aHqXeCfQ&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Barbell Incline Bench Press",
          "Primary Muscles": [
              "deltoid",
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "triceps"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=DbFgADa2PL8&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Dumbbell Incline Bench Press",
          "Primary Muscles": [
              "deltoid",
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "triceps"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=8iPEnn-ltC8&t=24s&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Dumbbell Decline Bench Press",
          "Primary Muscles": [
              "deltoid",
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "triceps"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=8iPEnn-ltC8&t=24s&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Barbell Decline Bench Press",
          "Primary Muscles": [
              "deltoid",
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "triceps"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=8iPEnn-ltC8&t=24s&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Dumbbell Chest Fly",
          "Primary Muscles": [
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "biceps",
              "deltoid",
              "finger extensors"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=eozdVDA78K0&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Dumbbell Incline Chest Fly",
          "Primary Muscles": [
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "biceps",
              "deltoid",
              "finger extensors"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=bDaIL_zKbGs&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Dumbbell Decline Chest Fly",
          "Primary Muscles": [
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "biceps",
              "deltoid",
              "finger extensors"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=IMALXhhHRKM&ab_channel=LIVESTRONG.COM"
      },
      {
          "Force": "push",
          "Name": "Machine Chest Fly",
          "Primary Muscles": [
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "biceps",
              "deltoid",
              "finger extensors"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=Z57CtFmRMxA&ab_channel=LIVESTRONG.COM"
      },
      {
          "Force": "push",
          "Name": "Cable Chest Fly",
          "Primary Muscles": [
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "biceps",
              "deltoid",
              "finger extensors"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=Iwe6AmxVf7o&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "High Cable Chest Fly",
          "Primary Muscles": [
              "deltoid",
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "biceps",
              "finger extensors",
              "latissimus dorsi"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=Iwe6AmxVf7o&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Single Arm Cable Chest Fly",
          "Primary Muscles": [
              "pectoralis major"
          ],
          "SecondaryMuscles": [
              "external oblique",
              "latissimus dorsi",
              "serratus anterior",
              "triceps"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=yaNwBor6SMs&ab_channel=ShytownFitness"
      },
      {
          "Force": "push",
          "Name": "Chest Dip",
          "Primary Muscles": [
              "pectoralis major",
              "triceps"
          ],
          "SecondaryMuscles": [
              "deltoid",
              "latissimus dorsi",
              "teres major",
              "trapezius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=dX_nSOOJIsE&ab_channel=Howcast"
      },
      {
          "Force": "push",
          "Name": "Dumbbell Bicep Curl",
          "Primary Muscles": [
              "biceps"
          ],
          "SecondaryMuscles": [
              "brachioradialis",
              "deltoid",
              "finger flexors",
              "trapezius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=ykJmrZ5v0Oo&ab_channel=Howcast"
      },
      {
          "Force": "push",
          "Name": "Preacher Bicep Curl",
          "Primary Muscles": [
              "biceps"
          ],
          "SecondaryMuscles": [
              "brachioradialis",
              "deltoid",
              "finger flexors",
              "trapezius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=fIWP-FRFNU0&ab_channel=KAGED"
      },
      {
          "Force": "push",
          "Name": "Barbell Bicep Curl",
          "Primary Muscles": [
              "biceps"
          ],
          "SecondaryMuscles": [
              "brachioradialis",
              "deltoid",
              "finger flexors",
              "trapezius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=kwG2ipFRgfo&ab_channel=Howcast"
      },
      {
          "Force": "push",
          "Name": "Dumbbell Hammer Curl",
          "Primary Muscles": [
              "biceps"
          ],
          "SecondaryMuscles": [
              "brachioradialis",
              "deltoid",
              "finger flexors",
              "trapezius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=zC3nLlEvin4&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Reverse Curl",
          "Primary Muscles": [
              "biceps"
          ],
          "SecondaryMuscles": [
              "brachioradialis",
              "deltoid",
              "finger flexors",
              "trapezius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=nRgxYX2Ve9w&ab_channel=Howcast"
      },
      {
          "Force": "push",
          "Name": "Plank",
          "Primary Muscles": [
              "abdominals",
              "external oblique"
          ],
          "SecondaryMuscles": [
              "deltoid",
              "gluteus maximus",
              "gluteus medius",
              "pectoralis major",
              "triceps"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=BQu26ABuVS0&ab_channel=WaysAndHow"
      },
      {
          "Force": "push",
          "Name": "Weighted Plank",
          "Primary Muscles": [
              "abdominals",
              "external oblique"
          ],
          "SecondaryMuscles": [
              "deltoid",
              "gluteus maximus",
              "gluteus medius",
              "pectoralis major",
              "triceps"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=H88Ip-MUWn0&ab_channel=StrengthSide"
      },
      {
          "Force": "push",
          "Name": "Crunch",
          "Primary Muscles": [
              "abdominals",
              "external oblique"
          ],
          "SecondaryMuscles": [
              "serratus anterior"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=Xyd_fa5zoEU&ab_channel=LIVESTRONG.COM"
      },
      {
          "Force": "push",
          "Name": "Cable Crunch",
          "Primary Muscles": [
              "abdominals",
              "external oblique"
          ],
          "SecondaryMuscles": [
              "serratus anterior"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=AV5PmZJIrrw&ab_channel=ColossusFitness"
      },
      {
          "Force": "push",
          "Name": "Dead Bug",
          "Primary Muscles": [
              "abdominals",
              "external oblique"
          ],
          "SecondaryMuscles": [
              "infraspinatus",
              "quadriceps",
              "serratus anterior",
              "teres major"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=4XLEnwUr1d8&ab_channel=Bodybuilding.com"
      },
      {
          "Force": "push",
          "Name": "Mountain Climbers",
          "Primary Muscles": [
              "abdominals"
          ],
          "SecondaryMuscles": [
              "deltoid",
              "gastrocnemius",
              "hamstrings",
              "quadriceps",
              "sartorius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=nmwgirgXLYM&ab_channel=Howcast"
      },
      {
          "Force": "push",
          "Name": "Hanging Knee Raises",
          "Primary Muscles": [
              "abdominals"
          ],
          "SecondaryMuscles": [
              "external oblique",
              "finger extensors",
              "finger flexors",
              "sartorius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=KhPTiWP6lB4&ab_channel=BrianSchmitt"
      },
      {
          "Force": "push",
          "Name": "Hanging Leg Raises",
          "Primary Muscles": [
              "abdominals"
          ],
          "SecondaryMuscles": [
              "external oblique",
              "finger extensors",
              "finger flexors",
              "sartorius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=hdng3Nm1x_E&ab_channel=ScottHermanFitness"
      },
      {
          "Force": "push",
          "Name": "Leg Raises",
          "Primary Muscles": [
              "abdominals"
          ],
          "SecondaryMuscles": [
              "external oblique",
              "sartorius"
          ],
          "Type": "compound",
          "Workout Type": [
              "strength"
          ],
          "Youtube link": "https://www.youtube.com/watch?v=l4kQd9eWclE&ab_channel=Howcast"
      }
  ])
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
    const muscles=musclesDictionaryFunc(input[1])
    muscleType==='P' ? params.primaryMuscle=muscles[0] : params.secondaryMuscle=muscles[0]
    api.defaults.params=params
    setMusclesLeft(muscles.slice(1))
  }
try{
  const response=await api.get('https://exerciseapi3.p.rapidapi.com/search/')
  if(!response.data.length){
    errorOccurred(`No exercises for ${Object.values(api.defaults.params)[0]} as a ${isSearchingPrimary ? 'Primary' : 'Secondary'}`)
  }
  setExercises(response.data)
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
    const response=await api.get('https://exerciseapi3.p.rapidapi.com/search/')
    if(!response.data.length){
        errorOccurred(`No exercises for ${Object.values(api.defaults.params)[0]} as a ${isSearchingPrimary ? 'Primary' : 'Secondary'}`)
    }
    setExercises([...exercises ,...response.data])
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