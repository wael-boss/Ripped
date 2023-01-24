import '../css/Gym.css'
import MuscleSearch from '../components/MuscleSearch'
import NameSearch from '../components/NameSearch'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import ExerciseSort from '../components/ExerciseSort'
const Gym = () => {
  const {exercises ,musclesLeft ,moreExercises}=useContext(DataContext)
    return (
      <main>
        <section id='searchSection'>
          <MuscleSearch/>
          -OR-
          <NameSearch/>
        </section>
        <section id='resultsSection'>
          <div id='intro'>
            <h2>Search for your exercise acording to eather its name or the muscle that it includes</h2>
          </div>
          <div id='resultsContainer'>
          {exercises.length ? 
          exercises.map(exercise=>{
            return(<ExerciseSort exercise={exercise}/>)
          })
          : <img src='/images/results404.png'/>}
          {musclesLeft.length!==0 &&
          <button
          id='moreExercisesBtn'
          onClick={moreExercises}
          >More exercises
          </button>}
          </div>
        </section>
      </main>
    )
  }
  
  export default Gym