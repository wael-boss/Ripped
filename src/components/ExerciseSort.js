import { useContext } from "react"
import DataContext from "../context/DataContext"
import ExercisesLoop from "./ExercisesLoop"

const ExerciseSort = ({exercise ,I}) => {
  const {generalMuscleImages ,exercises}=useContext(DataContext)
  return (
    <div className="exerciseGroup">
      <div className="exerciseInfo">
        <img width='200' src={generalMuscleImages[I]}/>
      </div>
      <ExercisesLoop exercises={exercise.data}/>
    </div>
  )
}

export default ExerciseSort