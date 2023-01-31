import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import ExerciseAPI from "../api/ExerciseAPI"
import DataContext from "../context/DataContext"
import ImgAPI from "../api/ImgAPI"
import '../css/exerciseFocus.css'
import {FaPlus ,FaPaperclip} from 'react-icons/fa'

const ExerciseFocus = () => {
  const {setItemsToAdd ,muscleAPIcolor ,EXERCISEtoIMGFunc ,setSearchParams ,searchParams ,errorOccurred ,navigator ,setIsLoading}=useContext(DataContext)
  const location=useLocation()
  const [exerciseFocus ,setExerciseFocus]=useState(null)
  const [isGettingImage ,setIsGettingImage]=useState(false)
  const [primaryCame ,setPrimaryCame]=useState(false)
  const [primaryImage ,setPrimaryImage]=useState(null)
  const [secondaryImage ,setSecondaryImage]=useState(null)
  const [showingPimage ,setShowingPimage]=useState(true)


  const getMuscleImage=useMemo(async()=>{
    if(isGettingImage) return
    if(!exerciseFocus) return
    if (!primaryImage || !secondaryImage){setIsGettingImage(true)}else return
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
    if(exerciseFocus !== null) return
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
  const imageScroller=useRef()
  useEffect(()=>{
    if(!imageScroller.current) return
    imageScroller.current.scrollTo({
      top:0,
      left:showingPimage ? 0 : imageScroller.current.offsetWidth,
      behavior:'smooth',
    })
  },[showingPimage])
  const handleCopy=()=>{
    navigator.clipboard.writeText(window.location.href)
  }
  return (
    <main>
      {exerciseFocus ? 
      <div id="exerciseContainer">
        <section id="muscleInfo">
          <div id="pageIntro">
            <h1>- {exerciseFocus.Name}</h1>
            <div id="funcButtons">
              <button
              title="share workout"
              onClick={()=>{
                handleCopy()
              }}
              ><FaPaperclip/></button>
              <button
              title="add workout"
              onClick={()=>{
                setItemsToAdd({
                  type:'exercise',
                  data:exerciseFocus.Name
                })
              }}
              ><FaPlus/></button>
            </div>
          </div>
          <h2>Force: {exerciseFocus.Force}.</h2>
          <div>
            <h2>Primary muscle{Object.values(exerciseFocus)[2].length>1 ? 's' : ''}:</h2>
            <ul>
              {Object.values(exerciseFocus)[2].map(muscle=>{
                return(
                  <li>{muscle}.</li>
                )
              })}
            </ul>
          </div>
          <div>
            <h2>Secondary muscle{Object.values(exerciseFocus)[3].length>1 ? 's' : ''}:</h2>
            <ul>
              {Object.values(exerciseFocus)[3].map(muscle=>{
                return(
                  <li>{muscle}.</li>
                )
              })}
            </ul>
          </div>
          <h2>workout genre: {exerciseFocus.Type}.</h2>
          <div>
            <h2>workout type{Object.values(exerciseFocus)[5].length>1 ? 's' : ''}:</h2>
            <ul>
              {Object.values(exerciseFocus)[5].map(type=>{
                return(
                  <li>{type}.</li>
                )
              })}
            </ul>
          </div>
        </section>
        <section id="muscleImages">
          <div id="imageScroller" ref={imageScroller}>
            <div>
              <p>Primary muscle group</p>
              {primaryImage ? <img src={primaryImage}/> : <div className="loadingMuscleImg"></div>}
            </div>
            <div>
            <p>Secodary muscle group</p>
              {secondaryImage ? <img src={secondaryImage}/> : <div className="loadingMuscleImg"></div>}
            </div>
          </div>
          <div id="squares">
            <span style={{backgroundColor:showingPimage ? 'var(--color2)' : 'transparent'}} onClick={()=>{
              setShowingPimage(true)
            }}></span>
            <span style={{backgroundColor:showingPimage ? 'transparent' : 'var(--color2)'}} onClick={()=>{
              setShowingPimage(false)
            }}></span>
          </div>
          <iframe
          src={`https://www.youtube.com/embed/${Object.values(exerciseFocus)[6].slice(32).slice(0 ,11)}`}>
          </iframe>
        </section>
      </div>
      : <p>wait</p>
      }
    </main>
  )
}

export default ExerciseFocus