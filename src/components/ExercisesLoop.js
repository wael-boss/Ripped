import {BsArrowRight} from 'react-icons/bs' 
const ExercisesLoop = ({exercises}) => {
  return (
    <div className="exerciseContainer">
    {exercises.map(exercise=>{
      console.log(exercise)
        return (
            <div className="exercise" key={exercise.Name}>
                <img src={`/images/${exercise.Force}.png`}/>
                <p>{exercise.Name}</p>
                <button><BsArrowRight/></button>
            </div>
        )
    })}
    </div>
  )
}

export default ExercisesLoop