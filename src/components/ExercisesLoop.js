
const ExercisesLoop = ({exercises}) => {
  return (
    <div className="exerciseContainer">
    {exercises.map(exercise=>{
        return (
            <div className="exercise" key={exercise.Name}>
                <p>{exercise.Name}</p>
            </div>
        )
    })}
    </div>
  )
}

export default ExercisesLoop