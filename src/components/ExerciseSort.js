import { useContext } from "react"
import DataContext from "../context/DataContext"

const ExerciseSort = ({exercise}) => {
  const {EXERCISEtoIMGFunc ,getMuscleImage}=useContext(DataContext)
  return (
    <div>
      <button
      style={{backgroundColor:'red'}}
      onClick={()=>{
      const muscles=EXERCISEtoIMGFunc(Object.values(exercise)[2])
      getMuscleImage(Object.values(exercise)[2])
    }}
    >{exercise.Name}</button>
    </div>
  )
}

export default ExerciseSort