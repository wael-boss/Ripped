import { useContext, useState } from "react"
import DataContext from "../context/DataContext"
import {FaSearch} from 'react-icons/fa'

const NameSearch = () => {
  const {getExercises ,nameSearch ,setNameSearch}=useContext(DataContext)
  const translateToName=(input)=>{
    const a=input.split(' ')
    const result=[]
    a.map(word=>{
      result.push(word.charAt(0).toUpperCase()+word.slice(1))
    })
    return result.join(' ')
  }
  return (
    <div id="nameSearchContainer">
        <form id="nameForm" onSubmit={(e)=>{
            e.preventDefault()
            const exercise={
              name:translateToName(nameSearch)
            }
            getExercises(exercise)
          }}>
            <input
            type='text'
            value={nameSearch}
            onChange={(e)=>{
              setNameSearch(e.target.value)
            }}
            placeholder='Search by exercise name'
            />
            <button type='submit'><FaSearch/></button>
        </form>
    </div>
  )
}

export default NameSearch