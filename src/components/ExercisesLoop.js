
const ExercisesLoop = ({exercises}) => {
  return (
    <>
    {exercises.map(exercise=>{
        return (
            <div>
                <p>{exercise.Name}</p>
            </div>
        )
    })}
    </>
  )
}

export default ExercisesLoop