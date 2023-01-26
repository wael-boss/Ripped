import { createContext, useMemo, useRef, useState } from "react";
import {auth} from '../Config'
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate, useSearchParams} from "react-router-dom";
import ExerciseAPI from "../api/ExerciseAPI";
import ImgAPI from "../api/ImgAPI";

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
    const dictionary=[
        {ImgApi:"all",ExerApi:["pectoralis major" ,"biceps" ,"abdominals" ,"sartorius" ,"abductors" ,"trapezius" ,"deltoid" ,"latissimus dorsi" ,"serratus anterior" ,"external oblique" ,"brachioradialis" ,"finger extensors" ,"finger flexors" ,"quadriceps" ,"hamstrings" ,"gastrocnemius" ,"soleus" ,"infraspinatus" ,"teres major" ,"triceps" ,"gluteus medius" ,"gluteus maximus"]},
        {ImgApi:"all_lower",ExerApi:["abductors" ,"sartorius" ,"gastrocnemius" ,"soleus" ,"gluteus maximus" ,"gluteus medius" ,"hamstrings" ,"quadriceps"]},
        {ImgApi:"all_upper",ExerApi:["pectoralis major" ,"biceps" ,"abdominals" ,"abductors" ,"trapezius" ,"deltoid" ,"latissimus dorsi" ,"serratus anterior" ,"external oblique" ,"brachioradialis" ,"finger extensors" ,"finger flexors" ,"infraspinatus" ,"teres major" ,"triceps"]},
        {ImgApi:"legs",ExerApi:["abductors" ,"sartorius" ,"gastrocnemius" ,"soleus" ,"hamstrings" ,"quadriceps"]},
        {ImgApi:"abductors",ExerApi:["abductors"]},
        {ImgApi:"abs",ExerApi:["abdominals"]},
        {ImgApi:"adductors",ExerApi:["sartorius"]},
        {ImgApi:"back",ExerApi:["trapezius" ,"latissimus dorsi" ,"teres major"]},
        {ImgApi:"back_upper",ExerApi:["trapezius" ,"teres major"]},
        {ImgApi:"biceps",ExerApi:["biceps"]},
        {ImgApi:"calfs",ExerApi:["gastrocnemius" ,"soleus"]},
        {ImgApi:"chest",ExerApi:["pectoralis major"]},
        {ImgApi:"core",ExerApi:["serratus anterior","external oblique","abdominals"]},
        {ImgApi:"core_lower",ExerApi:["external oblique"]},
        {ImgApi:"core_upper",ExerApi:["serratus anterior"]},
        {ImgApi:"forearms",ExerApi:["brachioradialis" ,"finger extensors" ,"finger flexors"]},
        {ImgApi:"gluteus",ExerApi:["gluteus maximus" ,"gluteus medius"]},
        {ImgApi:"hamstring",ExerApi:["hamstrings"]},
        {ImgApi:"latissimus",ExerApi:["latissimus dorsi"]},
        {ImgApi:"neck",ExerApi:["trapezius"]},
        {ImgApi:"quadriceps",ExerApi:["quadriceps"]},
        {ImgApi:"shoulders",ExerApi:["deltoid"]},
        {ImgApi:"shoulders_back",ExerApi:["infraspinatus"]},
        {ImgApi:"triceps",ExerApi:["triceps"]},
    ]
    const IMGtoExercise=(muscle)=>{
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
          result=['sartorius']
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
    const [user ,setUser]=useState(JSON.parse(localStorage.getItem('user')) || emptyUserOBJ)
    const [codeShown ,setCodeShown]=useState(true)
    const [error ,setError]=useState(null)
    const [isLoading ,setIsLoading]=useState(false)
    const [muscleAPIcolor ,setMuscleAPIcolor]=useState('200,100,80')
    const [signUpPasswordKeys ,setSignUpPasswordKeys]=useState('')
    const [searchParams ,setSearchParams]=useSearchParams({})
    const [nameSearch ,setNameSearch]=useState('')
    const [exercises ,setExercises]=useState([{
      "muscleType": "Primary",
      "muscleGroups": [
          "biceps"
      ],
      "data": [
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
          }
      ]
  }])
    const [musclesLeft ,setMusclesLeft]=useState([])
    const [isSearchingPrimary ,setIsSearchingPrimary]=useState(true)
    const [muscleSearch ,setMuscleSearch]=useState('')
    const [generalMuscleImages ,setGeneralMuscleImages]=useState([])
    const emailRef=useRef()
    const passwordCheck=useRef()
    const signInPasswordRef=useRef()
    const navigator=useNavigate()
    //functions
    const IMGtoEXERCISEFunc=(img)=>{
        let exercises=[]
        dictionary.map(obj=>{
            if(obj.ImgApi!==img) return
            exercises=obj.ExerApi
        })
        return exercises
    }
    const EXERCISEtoIMGFunc=(exercise)=>{
      console.log(exercise)
        let img=[]
        const contestants=[]
        dictionary.map(obj=>{
            if(JSON.stringify(obj.ExerApi) === JSON.stringify(exercise)){
                img.push(obj.ImgApi)
            }
        })
        if(img.length>0) return img 
        dictionary.map(obj=>{
            let testObj={img:obj.ImgApi,arrays:obj.ExerApi.length,matches:0}
            exercise.map(exer=>{
                if(obj.ExerApi.includes(exer)){
                    testObj.matches++
                }
            })
            if(testObj.matches){
                contestants.push(testObj)
            }
        })
        contestants.map(contestant=>{
            if(contestant.arrays<contestant.matches+1){
                img.push(contestant.img)
            }
        })
        // switch(img){
        //   case img.includes('all'):
        //   break;
        //   case img.includes('all_uppaer'):
        //   break;
        // }
        return img
    }
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
  },4000)
}

const getMuscleImage=useMemo(async()=>{
  if(!exercises.length) return
  const muscles=exercises[exercises.length-1].muscleGroups
  const muscleArr=EXERCISEtoIMGFunc(muscles)
  const params={muscleGroups:muscleArr.join(','), color:muscleAPIcolor}
  ImgAPI.defaults.params=params
  try{
      const response=await ImgAPI.get('/')
      const muscleBlob=new Blob([response.data])
      const imageUrl =URL.createObjectURL(muscleBlob);
      console.log([...generalMuscleImages ,imageUrl])
      setGeneralMuscleImages([...generalMuscleImages ,imageUrl])
  }catch(err){
      errorOccurred(err.message)
  }
},[exercises])


const getExercises=async(input)=>{
  setGeneralMuscleImages([])
  if(isLoading) return
  setMusclesLeft([])
  setIsLoading(true)
  ExerciseAPI.defaults.params=input
  if(input.length){
    const muscleType=input[0]
    const params={}
    const musclesArr=IMGtoExercise(input[1])
    muscleType==='P' ? params.primaryMuscle=musclesArr[0] : params.secondaryMuscle=musclesArr[0]
    ExerciseAPI.defaults.params=params
    setMusclesLeft(musclesArr.slice(1))
  }
try{
  const response=await ExerciseAPI.get('https://exerciseapi3.p.rapidapi.com/search/')
  console.log(response.data)
  if(!response.data.length){
    errorOccurred(`No exercises for ${Object.values(ExerciseAPI.defaults.params)[0]} as a ${isSearchingPrimary ? 'Primary' : 'Secondary'}`)
  }
  let execisesArr
  if(isSearchingPrimary){
     execisesArr=[{muscleType:isSearchingPrimary ? 'Primary' : 'Secondary',muscleGroups:Object.values(response.data[0])[2],data:response.data}]
  }else{
    let a=[]
    const result=[]
    response.data.map(result=>{
      a=[...a ,...result.SecondaryMuscles]
    })
    a.map(muscle=>{
      if(!result.includes(muscle)){
        result.push(muscle)
      }
    })
    execisesArr=[{muscleType:isSearchingPrimary ? 'Primary' : 'Secondary',muscleGroups:result,data:response.data}]
  }
  setExercises(execisesArr)
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
  ExerciseAPI.defaults.params=params
  setMusclesLeft(prev=>{
    const newArr=prev.slice(1)
    return newArr
  })
  try{
    const response=await ExerciseAPI.get('https://exerciseapi3.p.rapidapi.com/search/')
    console.log(ExerciseAPI.defaults.params)
    if(!response.data.length){
        errorOccurred(`No exercises for ${wantedMuscle} as a ${isSearchingPrimary ? 'Primary' : 'Secondary'}`)
        return
    }
    const execisesArr={muscleType:isSearchingPrimary ? 'Primary' : 'Secondary',muscleGroups:Object.values(response.data[0])[2],data:response.data}
    setExercises([...exercises ,execisesArr])
  }catch(err){
    errorOccurred(err.message)
  }finally{
    setIsLoading(false)
  }
}
return(
    <DataContext.Provider value={{
        user ,signOut ,setUser ,UserToLocalStorage ,codeShown ,setCodeShown ,emailRef ,signInPasswordRef ,handleSignUp ,handleSignIn ,passwordCheck ,signUpPasswordKeys ,setSignUpPasswordKeys ,navigator ,error ,setError ,isLoading ,searchParams ,setSearchParams ,getExercises ,exercises ,setExercises ,nameSearch ,setNameSearch ,musclesLeft ,isSearchingPrimary ,setIsSearchingPrimary ,muscleSearch ,setMuscleSearch ,moreExercises ,IMGtoEXERCISEFunc ,EXERCISEtoIMGFunc ,muscleAPIcolor ,setMuscleAPIcolor ,getMuscleImage ,dictionary ,generalMuscleImages
    }}>
        {children}
    </DataContext.Provider>
)
}

export default DataContext