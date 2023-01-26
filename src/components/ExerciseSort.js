import { useContext } from "react"
import DataContext from "../context/DataContext"
import ExercisesLoop from "./ExercisesLoop"

const ExerciseSort = ({exercise ,I}) => {
  const {generalMuscleImages ,muscleAPIcolor}=useContext(DataContext)
  return (
    <div className="exerciseGroup">
      <div className="exerciseInfo">
        {generalMuscleImages[I] ? <img src={generalMuscleImages[I]}/> : <div className="loadingMuscleImg"></div>}
        <p>benieth are exercises that work <span style={{color:`rgb(${muscleAPIcolor})`}}>{exercise.muscleGroups.join(' , ').toUpperCase()}</span> as a <span style={{color:`rgb(${muscleAPIcolor})`}}>{exercise.muscleType}</span> muscle.</p>
      </div>
      <ExercisesLoop exercises={exercise.data}/>
    </div>
  )
}

export default ExerciseSort