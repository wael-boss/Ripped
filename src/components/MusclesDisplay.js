import { useContext } from "react"
import DataContext from "../context/DataContext"

const MusclesDisplay = ({muscles ,muscleType}) => {
  const {getExercises}=useContext(DataContext)
  return (
    <div id="musclesContainer">
        {muscles.map(muscle=>{
            return(
            <p key={muscle} onClick={(e)=>{
              e.preventDefault()
              const params=[muscleType ,muscle]
              getExercises(params)
            }}>{muscle.split('_').join(' ')}</p>
            )
        })}
    </div>
  )
}

export default MusclesDisplay