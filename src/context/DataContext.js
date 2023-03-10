import { createContext, useMemo, useRef, useState } from "react";
import {auth} from '../Config'
import { GoogleAuthProvider,signInWithPopup ,FacebookAuthProvider ,deleteUser} from 'firebase/auth'
import {useNavigate, useSearchParams} from "react-router-dom";
import ExerciseAPI from "../api/ExerciseAPI";
import ImgAPI from "../api/ImgAPI";
import {getDatabase ,ref ,child ,get ,set, update ,remove} from "firebase/database";

const DataContext=createContext({})

export const DataProvider=({children})=>{
  const db=getDatabase()
    //logic
    const emptyUserOBJ={
      userName:null,
      userCrowns:[],
      userBio:'',
      userEmail:null,
      userPassword:null,
      userPhoto:null,
      userAge:null,
      userHeight:null,
      userWeight:null,
      userGender:null,
      userActivityLevel:null,
      userCalendar:[
      ['Saturday','day1',[]],
      ['Sunday','day2',[]],
      ['Monday','day3',[]],
      ['Tuesday','day4',[]],
      ['Wednesday','day5',[]],
      ['Thursday','day6',[]],
      ['Friday','day7',[]]
    ]
    }
    const calculations={
      BMR:{short:"BMR",long:" Basal Metabolic Rate",description:"BMR represents the amount of energy (in calories) that a person's body burns at rest, to carry out basic physiological functions such as breathing, circulation, and temperature regulation."},
      BMI:{short:"BMI",long:"Body Mass Index",description:"BMI is a measure of a person's body fat based on their weight and height. It is calculated by dividing a person's weight (in kilograms) by their height (in meters) squared"},
      TDEE:{short:"TDEE",long:"Total Daily Energy Expenditure",description:"TDEE represents the total number of calories that a person's body burns in a day, taking into account their BMR as well as their level of physical activity and other factors such as age, sex, and weight. TDEE is often used to determine the number of calories a person needs to consume in order to maintain, gain, or lose weight"}
    }
    const activityTypes = {
      Sedentary: {
        label: 'Sedentary',
        factor: 1.2,
        description: 'Little to no exercise and a desk job'
      },
      LightlyActive: {
        label: 'Lightly Active',
        factor: 1.375,
        description: 'Light exercise or sports 1-3 days a week'
      },
      ModeratelyActive: {
        label: 'Moderately Active',
        factor: 1.55,
        description: 'Moderate exercise or sports 3-5 days a week'
      },
      VeryActive: {
        label: 'Very Active',
        factor: 1.725,
        description: 'Hard exercise or sports 6-7 days a week'
      },
      ExtraActive: {
        label: 'Extra Active',
        factor: 1.9,
        description: 'Very hard exercise or sports, physical job or training twice a day'
      }
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
    const [user ,setUser]=useState(JSON.parse(sessionStorage.getItem('user')) || emptyUserOBJ)
    const [authenticationId ,setAuthenticationId]=useState(localStorage.getItem('authenticationId') || '')
    const [codeShown ,setCodeShown]=useState(true)
    const [error ,setError]=useState(null)
    const [isLoading ,setIsLoading]=useState(false)
    const [muscleAPIcolor ,setMuscleAPIcolor]=useState(localStorage.getItem('secondaryColor') || '200,100,80')
    const [signUpPasswordKeys ,setSignUpPasswordKeys]=useState('')
    const [searchParams ,setSearchParams]=useSearchParams({})
    const [nameSearch ,setNameSearch]=useState('')
    const [exercises ,setExercises]=useState([])
    const [musclesLeft ,setMusclesLeft]=useState([])
    const [isSearchingPrimary ,setIsSearchingPrimary]=useState(true)
    const [muscleSearch ,setMuscleSearch]=useState('')
    const [generalMuscleImages ,setGeneralMuscleImages]=useState([])
    const [itemsToAdd ,setItemsToAdd]=useState({})
    const [users ,setUsers]=useState([])
    const [userProfile ,setUserProfile]=useState(user) 
    const [nameInput ,setNameInput]=useState('')
    const [isValidName ,setIsValidName]=useState(true)
    const [editUserRefs ,setEditUserRefs]=useState({})
    const [isToggledSieBar ,setIsToggledSieBar]=useState(false)
    const [headerFixed ,setHeaderFixed]=useState({
      scroll:0,
      height:0
    })
    const emailRef=useRef()
    const passwordCheck=useRef()
    const signInPasswordRef=useRef()
    const muscleChoiceInput=useRef()
    const navigator=useNavigate()
    // fitness calculations
    const calcBMI=(PROFILE)=>{
      const {userHeight ,userWeight}=PROFILE
      if(!userHeight || !userWeight) return <p>not much info</p>
      const indicator={}
      const num=userHeight/100
      let bmi=userWeight/(num*num)
      if(bmi<18.5){
        indicator.range='Under weight'
        indicator.color='#ffff00'
      }
      if(bmi>=18.5 && bmi<=24.9){
        indicator.range='Healthy weight'
        indicator.color='#00ff00'
      }
      if(bmi>=25 && bmi<=29.9){
        indicator.range='Over weight'
        indicator.color='#ff0000'
      }
      if(bmi>=30){
        indicator.range='Massive'
        indicator.color='#9d0000'
      }
      bmi=Math.round(bmi*100)/100

      return <p>BMI: {bmi.toFixed(2)}<span title={indicator.range} style={{color:indicator.color,marginLeft:'10px',cursor:"pointer"}}>{indicator.range[0]}</span></p>
    }
    const calcBMR=(PROFILE)=>{
      const {userHeight ,userWeight ,userGender ,userAge}=PROFILE
      if(!userHeight || !userWeight || !userGender || !userAge) return 'not much info'
      if (userGender === "male") {
        var bmr=88.36+(13.4*userWeight)+(4.8*userHeight)-(5.7*userAge)
      } else if (userGender === "female") {
        var bmr=447.6+(9.2*userWeight)+(3.1*userHeight)-(4.3*userAge)
      }
      return bmr.toFixed(2)
    }
    const calcTDEE=(PROFILE)=>{
      const {userHeight ,userWeight ,userGender ,userAge ,userActivityLevel}=PROFILE
      if(!userHeight || !userWeight || !userGender || !userAge || !userActivityLevel) return 'not much info'
      // end
      let ALF=0
      Object.entries(activityTypes).map(([key ,value])=>{
        if(value.label!==userActivityLevel) return
        ALF=value.factor
      })
      var bmr = calcBMR(PROFILE)
      var tdee = (bmr * ALF)
      return tdee.toFixed(2)
    }
    // end
    const IMGtoEXERCISEFunc=(img)=>{
      let exercises=[]
      dictionary.map(obj=>{
        if(obj.ImgApi!==img) return
        exercises=obj.ExerApi
      })
      return exercises
    }
  const EXERCISEtoIMGFunc=(exercise)=>{
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
      return img
  }
  const secondaryColorToLs=useMemo(()=>{
    localStorage.setItem('secondaryColor' ,muscleAPIcolor)
    document.documentElement.style.setProperty('--color4',`rgb(${muscleAPIcolor})`)
  },[muscleAPIcolor])
  const signOutFunc=()=>{
    setAuthenticationId('')
    setUser(emptyUserOBJ)
  }
  const authenticationIdToLS=useMemo(()=>{
    localStorage.setItem('authenticationId' ,authenticationId)
  },[authenticationId])
  const saveUserToSession=useMemo(()=>{
    sessionStorage.setItem('user',JSON.stringify(user))
  },[user])
  // calendar functions
  const addExeciseToCalendar=async(day)=>{
    if(isLoading) return
    const dayCounter=day[0]
    const dayName=day[1]
    const dayExercises=day[2]
    const newDay=[dayCounter ,dayName ,[...dayExercises ,itemsToAdd.data]]
    let newCalendar=user.userCalendar
    user.userCalendar.map(day=>{
      if(day[1]===dayName){
        if(day[2].includes(itemsToAdd.data)){
          errorOccurred(`${day[1]} already contains this exercise`)
          return
        }
      newCalendar.splice(newCalendar.indexOf(day),1,newDay)
    }
    })
    try{
      setIsLoading(true)
      const response=await updateUserDetail('userCalendar',JSON.stringify(newCalendar))
      setUser({...user ,userCalendar:newCalendar})
      setItemsToAdd({})
    }catch(err){
      errorOccurred(err.message)
    }finally{
      setIsLoading(false)
    }
  }
  const removeExeciseFromCalendar=async(day ,targetExercise)=>{
    if(isLoading) return
    setIsLoading(true)
    const dayCounter=day[0]
    const dayName=day[1]
    const dayExercises=day[2]
    const newDay=[dayCounter ,dayName ,
    dayExercises.filter(exercise=>exercise!==targetExercise)
    ]
    let newCalendar=user.userCalendar
    user.userCalendar.map(day=>{
      if(day[1]===dayName){
      newCalendar.splice(newCalendar.indexOf(day),1,newDay)
    }
    })
    try{
      const response=await updateUserDetail('userCalendar',JSON.stringify(newCalendar))
      setUser({...user ,userCalendar:newCalendar})
    }catch(err){
      errorOccurred(err.message)
    }finally{
      setIsLoading(false)
    }
  }
  const editDayName=async(day ,newName)=>{
    if(isLoading) return
    let newCalendar=user.userCalendar
    let daysWithSameName=0
    user.userCalendar.map(day=>{
      if(day[1]===newName){
        daysWithSameName++
      }
    })
    if(daysWithSameName>0){
      errorOccurred("there is a day already called this name")
      return
    }
    const newDay=[day[0] ,newName ,day[2]]
    newCalendar.splice(newCalendar.indexOf(day),1,newDay)
    try{
      setIsLoading(true)
      const response=await updateUserDetail('userCalendar',JSON.stringify(newCalendar))
      setUser({...user ,userCalendar:newCalendar})
    }catch(err){
      errorOccurred(err.message)
    }finally{
      setIsLoading(false)
    }
  }
  const emptyDay=async(day)=>{
    if(!day[2].length){
      errorOccurred('this day is already empty')
      return
    }
    let newCalendar=user.userCalendar
    const newDay=[day[0] ,day[1] ,[]]
    newCalendar.splice(newCalendar.indexOf(day),1,newDay)
    try{
      setIsLoading(true)
      const response=await updateUserDetail('userCalendar',JSON.stringify(newCalendar))
      setUser({...user ,userCalendar:newCalendar})
    }catch(err){
      errorOccurred(err.message)
    }finally{
      setIsLoading(false)
    }
  }
  const emptyCalendar=async()=>{
    if(isLoading) return
    const newCalendar=emptyUserOBJ.userCalendar
    console.log(newCalendar)
    try{
      setIsLoading(true)
      const response=await updateUserDetail('userCalendar',JSON.stringify(newCalendar))
      setUser({...user ,userCalendar:newCalendar})
    }catch(err){
      errorOccurred(err.message)
    }finally{
      setIsLoading(false)
    }
  }
  // end
  const editUserDetails=()=>{
    if(nameInput.length && !isValidName){
      errorOccurred('invalid name')
      return
    }
    const newData={}
    const validGenders=['male' ,'female']
    Object.entries(editUserRefs).map(([key ,value])=>{
      if(key==='userPhoto'){
        newData[key]=value.src
        return
      }
      if(!value.value.length || !value.value) return
      if(key==='userGender' && !validGenders.includes(value.value)) return
      if(user[key]===value.value) return
      newData[key]=value.value
    })
    if(!Object.values(newData).length){
      errorOccurred('nothing was changed')
      return
    }
    const NewUser={
      ...user ,
      ...newData
    }
    setUser(NewUser)
    craeteUser(NewUser)
    navigator('/profile')
  }
  const validNameCheck=useMemo(()=>{
    const allNames=[]
    users.map(user=>allNames.push(user.userName))
    if(allNames.includes(nameInput) || !nameInput.length || nameInput.length>20){
        setIsValidName(false)
        return
    }
    setIsValidName(true)
    },[nameInput])
//database functions
const replaceDayByNew=async(oldDayData ,newDayData)=>{
  if(!oldDayData ,!oldDayData){
    errorOccurred('not enaugh data to proform action')
    return
  }
const newCalendar=[]
user.userCalendar.map(day=>{
  if(day[1]===oldDayData[1]) return newCalendar.push([day[0] ,day[1] ,newDayData[2]])
  newCalendar.push(day)
})
try{
  setIsLoading(true)
  const response=await updateUserDetail('userCalendar',JSON.stringify(newCalendar))
  setUser({...user ,userCalendar:newCalendar})
}catch(err){
  errorOccurred(err.message)
}finally{
  setIsLoading(false)
}
}
const replaceEntireCalendar=async(newCalendar)=>{
try{
  setIsLoading(true)
  const response=await updateUserDetail('userCalendar',JSON.stringify(newCalendar))
  setUser({...user ,userCalendar:newCalendar})
}catch(err){
  errorOccurred(err.message)
}finally{
  setIsLoading(false)
}
}
const deleteAcount=(inputPassword)=>{
  if(user.userPassword!==inputPassword){
    errorOccurred('wrong password')
    return
  }
  remove(ref(db ,'users/'+authenticationId))
  auth.currentUser.delete()
  signOutFunc()
}
const coronateUser=async(target)=>{
  const updates={}
  const {userId ,userCrowns}=target
  updates.userCrowns=[...userCrowns ,authenticationId]
  if(userCrowns.includes(authenticationId)){
    updates.userCrowns=userCrowns.filter(followerId=>followerId!==authenticationId)
  }
  try{
    const response=await update(ref(db ,`users/${userId}`),updates)
    const newUser={...userProfile ,userCrowns:updates.userCrowns}
    setUserProfile(newUser)
  }catch(err){
    errorOccurred(err.message)
  }
}
const getAllUsers=async()=>{
  if(isLoading) return
  setIsLoading(true)
  const dbRef=ref(db)
  let usersResult=[]
  try{
    const snapshot=await get(child(dbRef, `users`))
    if (snapshot.exists()){
    const response=snapshot.val()
    Object.entries(response).map(arr=>{
      const responseId=arr[0]
      const responseUser=arr[1]
      const userOBJ={
        ...emptyUserOBJ,
        ...responseUser,
        userCalendar:JSON.parse(responseUser.userCalendar),
        userId:responseId
      }
      usersResult.push(userOBJ)
    })
    setUsers(usersResult)
  }
}catch(err){
    errorOccurred(err.message)
  }finally{
    setIsLoading(false)
  }
}
const updateUserDetail=async(option,data)=>{
  setIsLoading(true)
  const updates={}
  updates[option]=data
  try{
    const response=await update(ref(db ,`users/${auth.currentUser.uid}`),updates)
  }catch(err){
    errorOccurred(err.message)
  }finally{
    setIsLoading(false)
  }
}
const craeteUser=async(userData)=>{
  setIsLoading(true)
  const finalObj={
    ...userData,
    userCalendar:JSON.stringify(userData.userCalendar)
  }
  try{
    const response=await set(ref(db, `users/${authenticationId}`), finalObj);
    setUser(userData)
  }catch(err){
    errorOccurred(err.message)
  }finally{
    setIsLoading(false)
  }
}
  const PlatformLogIn=async(platform)=>{
    if(isLoading) return
    setIsLoading(true)
    let Provider=''
    if(platform==='g'){
      Provider=new GoogleAuthProvider()
    }else if(platform==='f'){
      Provider=new FacebookAuthProvider()
    }
    if(Provider===''){
      errorOccurred('something went wrong')
      return
    }
    try{
      const response=await signInWithPopup(auth ,Provider)
      setUser({...user ,userPhoto:response.user.photoURL})
      setAuthenticationId(response.user.uid)
    }catch(err){
      errorOccurred(err.message)
    }finally{
      setIsLoading(false)
    }
  }
  const handleSignIn=async()=>{
    setIsLoading(true)
    const emailInput=emailRef.current.value
    const passwordInput=signInPasswordRef.current.value
    const dbRef=ref(db)
    try{
      const snapshot=await get(child(dbRef, `users/${authenticationId}`))
      if (snapshot.exists()){
      const response=snapshot.val()
      if(emailInput===response.userEmail && passwordInput===response.userPassword){
        setUser({
          ...user,
          ...response,
          userCalendar:JSON.parse(response.userCalendar)
        }) 
      }else{
        if(emailInput===response.userEmail){
          errorOccurred('wrong password')
        }else{
          errorOccurred('wrong information')
        }
      }
    }else{
      errorOccurred('this is not a valid acount')
    }
    }catch(err){
      errorOccurred(err.message)
    }finally{
      setIsLoading(false)
    }
  }
  const handleSignUp=async()=>{
    const OBJ={
      ...user,
      userEmail:emailRef.current.value,
      userPassword:signUpPasswordKeys,
      userName:emailRef.current.value.split('@')[0],
      userPhoto:auth.currentUser.photoURL
    }
    if(!OBJ.userPhoto){
      setAuthenticationId('')
      errorOccurred('something went wrong')
      return
    }
    craeteUser(OBJ)
}
//end of database funcs
const errorOccurred=(err)=>{
  setError(err)
  setTimeout(()=>{
  setError(null)
  },4000)
}

const getMuscleImage=useMemo(async()=>{
  if(!exercises.length) {
    return
  }
  const muscles=exercises[exercises.length-1].muscleGroups
  const muscleArr=EXERCISEtoIMGFunc(muscles)
  const params={muscleGroups:muscleArr.join(','), color:muscleAPIcolor}
  ImgAPI.defaults.params=params
  try{
      const response=await ImgAPI.get('/')
      const muscleBlob=new Blob([response.data])
      const imageUrl =URL.createObjectURL(muscleBlob);
      setGeneralMuscleImages([...generalMuscleImages ,{image:imageUrl,muscles:muscles}])
  }catch(err){
      errorOccurred(err.message)
  }
},[exercises])

const fixMuscleForce=(exercises)=>{
  const result=[]
  const pullMuscles = [
    "biceps",
    "latissimus dorsi",
    "trapezius",
    "rhomboids",
    "teres major",
    "rear deltoids",
    "brachialis",
    "forearm extensors",
    "forearm flexors",
    "abdominals"
  ]
exercises.map(exercise=>{
  const Obj={...exercise}
  let isPull=false
  Object.values(exercise)[2].map(muscle=>{
    if(pullMuscles.includes(muscle)) isPull=true
  })
  if(isPull) Obj.Force='pull'
  result.push(Obj)
})
return result
}
const getExercises=async(input)=>{
  setGeneralMuscleImages([])
  if(isLoading) return
  setMusclesLeft([])
  ExerciseAPI.defaults.params=input
  if(input.length){
    const muscleType=input[0]
    const params={}
    const musclesArr=IMGtoExercise(input[1])
    muscleType==='P' ? params.primaryMuscle=musclesArr[0] : params.secondaryMuscle=musclesArr[0]
    ExerciseAPI.defaults.params=params
    setMusclesLeft(musclesArr.slice(1))
  }else{
    if(!input.name) return
  }
  setIsLoading(true)
try{
  const response=await ExerciseAPI.get('https://exerciseapi3.p.rapidapi.com/search/')
  if(!response.data.length){
    errorOccurred(`No exercises for ${Object.values(ExerciseAPI.defaults.params)[0]} as a ${isSearchingPrimary ? 'Primary' : 'Secondary'}`)
    setExercises([])
    return
  }
  const filteredExercises=fixMuscleForce(response.data)
  let execisesArr=[]
  if(isSearchingPrimary){
     execisesArr=[{muscleType:'Primary',muscleGroups:Object.values(response.data[0])[2],data:filteredExercises}]
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
    execisesArr=[{muscleType:'Secondary',muscleGroups:result,data:filteredExercises}]
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
    if(!response.data.length){
        errorOccurred(`No exercises for ${wantedMuscle} as a ${isSearchingPrimary ? 'Primary' : 'Secondary'}`)
        return
    }
    const filteredExercises=fixMuscleForce(response.data)
    const execisesArr={muscleType:isSearchingPrimary ? 'Primary' : 'Secondary',muscleGroups:Object.values(response.data[0])[2],data:filteredExercises}
    setExercises([...exercises ,execisesArr])
  }catch(err){
    errorOccurred(err.message)
  }finally{
    setIsLoading(false)
  }
}
return(
    <DataContext.Provider value={{
        user ,signOutFunc ,setUser ,codeShown ,setCodeShown ,emailRef ,signInPasswordRef ,handleSignUp ,handleSignIn ,passwordCheck ,signUpPasswordKeys ,setSignUpPasswordKeys ,navigator ,error ,setError ,isLoading ,searchParams ,setSearchParams ,getExercises ,exercises ,setExercises ,nameSearch ,setNameSearch ,musclesLeft ,isSearchingPrimary ,setIsSearchingPrimary ,muscleSearch ,setMuscleSearch ,moreExercises ,IMGtoEXERCISEFunc ,EXERCISEtoIMGFunc ,muscleAPIcolor ,setMuscleAPIcolor ,getMuscleImage ,dictionary ,generalMuscleImages ,errorOccurred ,setIsLoading ,muscleChoiceInput ,itemsToAdd ,setItemsToAdd ,PlatformLogIn ,authenticationId ,setAuthenticationId ,updateUserDetail ,addExeciseToCalendar ,removeExeciseFromCalendar ,editDayName ,emptyDay ,emptyCalendar ,users ,setUsers ,getAllUsers ,calcBMI ,calcBMR ,calcTDEE ,coronateUser
        ,userProfile ,setUserProfile ,activityTypes ,editUserRefs ,calculations ,editUserDetails ,deleteAcount,nameInput ,setNameInput ,isValidName ,setIsValidName ,setEditUserRefs ,replaceDayByNew ,replaceEntireCalendar ,isToggledSieBar ,setIsToggledSieBar ,headerFixed ,setHeaderFixed
    }}>
        {children}
    </DataContext.Provider>
)
}

export default DataContext