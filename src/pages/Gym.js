import '../css/Gym.css'
import MuscleSearch from '../components/MuscleSearch'
import NameSearch from '../components/NameSearch'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
const Gym = () => {
  const {exercises}=useContext(DataContext)
    return (
      <main>
        <section id='searchSection'>
          <MuscleSearch/>
          <NameSearch/>
        </section>
        <section>
          <ol style={{padding:-1}}>
          {exercises && exercises.map(e=>{
            return(
              <li key={e.Name}>{e.Name}</li>
            )
          })}
          </ol>
        </section>
      </main>
    )
  }
  
  export default Gym