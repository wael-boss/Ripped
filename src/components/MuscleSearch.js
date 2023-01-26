import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext'
import MusclesDisplay from './MusclesDisplay'

const MuscleSearch = () => {
  const {dictionary ,isSearchingPrimary ,setIsSearchingPrimary ,muscleSearch ,setMuscleSearch}=useContext(DataContext)
  const dictionaryMuscles=()=>{
    const result=[]
    dictionary.map(obj=>{
      result.push(obj.ImgApi)
    })
    return result
  }
  const muscles=dictionaryMuscles(dictionary)
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