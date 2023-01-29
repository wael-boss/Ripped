import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ExerciseAPI from "../api/ExerciseAPI"
import DataContext from "../context/DataContext"
import {HiArrowNarrowRight} from 'react-icons/hi'
const ExerciseFocus = () => {
  const {setSearchParams ,searchParams ,errorOccurred ,navigator ,setIsLoading}=useContext(DataContext)
  const location=useLocation()
  const [exerciseFocus ,setExerciseFocus]=useState(null)
  const paramsExericseName=searchParams.get('name')
  const locationExercise=!location.state ? null : location.state.exercise
  useEffect(()=>{
    if(!paramsExericseName && !locationExercise) {
      navigator('/')
      return
    }
    const OnLoad=async()=>{
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
  OnLoad()
  },[])
  console.log(exerciseFocus)
  return (
    <main>
      {exerciseFocus ? 
      <div>
        <h1>{exerciseFocus.Name}</h1>
      </div> : <p>wait</p>
      }
    </main>
  )
}

export default ExerciseFocus