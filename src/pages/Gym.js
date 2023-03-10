import '../css/Gym.css'
import MuscleSearch from '../components/MuscleSearch'
import NameSearch from '../components/NameSearch'
import { useContext, useEffect } from 'react'
import DataContext from '../context/DataContext'
import ExerciseSort from '../components/ExerciseSort'
const Gym = () => {
  const {exercises ,musclesLeft ,moreExercises ,setItemsToAdd}=useContext(DataContext)
  let i=-1
  useEffect(()=>{
    setItemsToAdd({})
  },[])
    return (
      <main>
        <section id='searchSection'>
          <MuscleSearch/>
          <p id='OR'>-OR-</p>
          <NameSearch/>
        </section>
        <section id='resultsSection'>
          <div id='intro'>
            <h2>Search for your exercise acording to eather its name or the muscle that it includes</h2>
          </div>
          <div id='resultsContainer'>
          {exercises.length ? 
          exercises.map(exercise=>{
            i++
            return(<ExerciseSort key={JSON.stringify(exercise)} exercise={exercise} I={i}/>)
          })
          : <img src='/images/results404.png'/>}
          {musclesLeft.length!==0 &&
          <button
          id='moreExercisesBtn'
          onClick={moreExercises}
          >Next muscle group (<span> {musclesLeft[0]} </span>)
          </button>}
          </div>
        </section>
      </main>
    )
  }
  
  export default Gym