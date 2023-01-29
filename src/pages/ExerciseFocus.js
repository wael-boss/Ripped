import { useContext, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import ExerciseAPI from "../api/ExerciseAPI"
import DataContext from "../context/DataContext"
import {HiArrowNarrowRight} from 'react-icons/hi'
import ImgAPI from "../api/ImgAPI"
const ExerciseFocus = () => {
  const {muscleAPIcolor ,EXERCISEtoIMGFunc ,generalMuscleImages ,setSearchParams ,searchParams ,errorOccurred ,navigator ,setIsLoading}=useContext(DataContext)
  const location=useLocation()
  const [exerciseFocus ,setExerciseFocus]=useState(null)
  const [isGettingImage ,setIsGettingImage]=useState(false)
  const [primaryCame ,setPrimaryCame]=useState(false)
  const [primaryImage ,setPrimaryImage]=useState(null)
  const [secondaryImage ,setSecondaryImage]=useState(null)




  const getMuscleImage=useMemo(async()=>{
    if(isGettingImage) return
    if(!exerciseFocus) return
    if (!primaryImage || !secondaryImage) setIsGettingImage(true)
    console.log('got image')
    if(!primaryImage){
      const primaryMuscles=Object.values(exerciseFocus)[2]
      const muscleArr=EXERCISEtoIMGFunc(primaryMuscles)
      const params={muscleGroups:muscleArr.join(','), color:muscleAPIcolor}
      ImgAPI.defaults.params=params
      try{
          const response=await ImgAPI.get('/')
          const imageUrl =convertBlob(response.data);
          setPrimaryImage(imageUrl)
          setPrimaryCame(true)
      }catch(err){
          errorOccurred(err.message)
      }finally{
        setIsGettingImage(false)
      }
    }else{
      const secondaryMuscles=Object.values(exerciseFocus)[3]
      const muscleArr=EXERCISEtoIMGFunc(secondaryMuscles)
      const params={muscleGroups:muscleArr.join(','), color:muscleAPIcolor}
      ImgAPI.defaults.params=params
      try{
          const response=await ImgAPI.get('/')
          const imageUrl =convertBlob(response.data);
          setSecondaryImage(imageUrl)
      }catch(err){
          errorOccurred(err.message)
      }finally{
        setIsGettingImage(false)
      }
    }
  },[exerciseFocus ,primaryCame])

  const paramsExericseName=searchParams.get('name')
  const locationExercise=!location.state ? null : location.state.exercise
  const OnLoadExercise=async()=>{
    if(!paramsExericseName){
        setSearchParams({...searchParams ,name:locationExercise.Name})
        setExerciseFocus(locationExercise)
    }else{
      setIsLoading(true)
      try{
        ExerciseAPI.defaults.params={name:paramsExericseName}
        const response=await ExerciseAPI.get('https://exerciseapi3.p.rapidapi.com/search/')
        setExerciseFocus(response.data[0])
      }catch(err){
        errorOccurred(err.message)
      }finally{
        setIsLoading(false)
      }
    }
  }
const convertBlob=(blob)=>{
  const muscleBlob=new Blob([blob])
  return URL.createObjectURL(muscleBlob)
}

  
  useEffect(()=>{
    if(!paramsExericseName && !locationExercise) {
      navigator('/')
      return
    }
  OnLoadExercise()
  },[])
  console.log(exerciseFocus)
  return (
    <main>
      {exerciseFocus ? 
      <div>
        <h1>{exerciseFocus.Name}</h1>
        {primaryImage ? <img   width='200' height='200' src={primaryImage}/> : <div className="loadingMuscleImg"></div>}
        {secondaryImage ? <img width='200' height='200' src={secondaryImage}/> : <div className="loadingMuscleImg"></div>}
      </div>
      : <p>wait</p>
      }
    </main>
  )
}

export default ExerciseFocus