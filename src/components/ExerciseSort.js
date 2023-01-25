import { useContext } from "react"
import DataContext from "../context/DataContext"

const ExerciseSort = ({exercise}) => {
  const {EXERCISEtoIMGFunc}=useContext(DataContext)
  return (
    <div>
      <button style={{backgroundColor:'red'}} onClick={()=>{
      console.log(EXERCISEtoIMGFunc(Object.values(exercise)[2]))
    }}>{exercise.Name}</button>
    </div>
  )
}

export default ExerciseSort