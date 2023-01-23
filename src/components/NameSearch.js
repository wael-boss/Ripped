import { useContext } from "react"
import DataContext from "../context/DataContext"
import {FaSearch} from 'react-icons/fa'

const NameSearch = () => {
  const {searchParams ,setSearchParams ,getExercises}=useContext(DataContext)
  const EN=searchParams.get('EN')

  const translateToName=(input)=>{
    const a=input.split(' ')
    const result=[]
    a.map(word=>{
      result.push(word.charAt(0).toUpperCase()+word.slice(1))
    })
    return result.join(' ')
  }
  return (
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            const exercise={
              name:translateToName(EN)
            }
            getExercises(exercise)
          }}>
            <input
            type='text'
            value={EN}
            onChange={(e)=>{
              setSearchParams({...searchParams,EN:e.target.value})
            }}
            />
            <button type='submit'><FaSearch/></button>
        </form>
    </div>
  )
}

export default NameSearch