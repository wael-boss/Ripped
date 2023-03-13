import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext'
import MusclesDisplay from './MusclesDisplay'

const MuscleSearch = () => {
  const {muscleChoiceInput ,dictionary ,isSearchingPrimary ,setIsSearchingPrimary ,muscleSearch ,setMuscleSearch}=useContext(DataContext)
  const dictionaryMuscles=()=>{
    const result=[]
    dictionary.map(obj=>{
      result.push(obj.ImgApi)
    })
    return result
  }
  const primaryMuscles=["all", "all_lower", "all_upper", "legs" , "abs" , "back", "back_upper", "biceps", "chest", "core", "core_lower" , "gluteus", "hamstring", "latissimus", "neck", "quadriceps", "shoulders" , "triceps",]
  const muscles=isSearchingPrimary ? primaryMuscles :dictionaryMuscles(dictionary)
  return (
    <div id='musclesFormContainer'>
      <div id='musclesForm'>
        <button title={`${isSearchingPrimary ? 'Primary' : 'Secondary'} muscle`}
        style={{backgroundColor:isSearchingPrimary ? 'var(--color2)' : 'var(--color3)'}}
        onClick={()=>{
          setIsSearchingPrimary(!isSearchingPrimary)
        }}
        >{isSearchingPrimary ? 'P' : 'S'}</button>
        <input
        ref={muscleChoiceInput}
        placeholder={`Search by ${isSearchingPrimary ? 'Primary' : 'Secondary'} muscle`}
        value={muscleSearch}
        onChange={(e)=>{
          setMuscleSearch(e.target.value)
        }}
        />
        <MusclesDisplay
        muscles={muscleSearch.length ? muscles.sort().filter(muscle=>(muscle.toLowerCase()).includes(muscleSearch.toLocaleLowerCase()))
        : muscles}
        muscleType={isSearchingPrimary ? 'P' : 'S'}
        />
      </div>
    </div>
  )
}

export default MuscleSearch