import { useContext } from 'react'
import {BsArrowRight} from 'react-icons/bs' 
import DataContext from '../context/DataContext'
const ExercisesLoop = ({exercises}) => {
  const {navigator ,setSearchParams ,searchParams}=useContext(DataContext)
  return (
    <div className="exerciseContainer">
    {exercises.map(exercise=>{
        return (
            <div className="exercise" key={exercise.Name}>
                <img src={`/images/${exercise.Force}.png`}/>
                <p>{exercise.Name}</p>
                <button onClick={()=>{
                  navigator('/exerciseFocus' ,{state:{exercise:exercise}})
                }}><BsArrowRight/></button>
            </div>
        )
    })}
    </div>
  )
}

export default ExercisesLoop