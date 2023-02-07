import { useContext } from "react"
import DataContext from "../context/DataContext"
import {RxCross2} from 'react-icons/rx'
const AddWorkout = () => {
    const {updateUserDetail ,errorOccurred ,setUser ,user ,itemsToAdd ,setItemsToAdd}=useContext(DataContext)
    const innerContent=()=>{
      if(itemsToAdd.type==='exercise'){
      return(
        <>
          <h3>add this exercise to a day of choice</h3>
          <div className="daysContainer">
          {user.userCalendar.map(day=>{
            const dayCounter=day[0]
            const dayName=day[1]
            const dayExercises=day[2]
            return(
              <button
              key={dayName}
              title={
                dayExercises.map(exercise=>{
                  return exercise
                })
              }
              onClick={()=>{
                const newDay=[dayCounter ,dayName ,[...dayExercises ,itemsToAdd.data]]
                let newCalendar=user.userCalendar
                user.userCalendar.map(day=>{
                  if(day[1]===dayName){
                    if(day[2].includes(itemsToAdd.data)){
                      errorOccurred(`${day[1]} already contains this exercise`)
                      return
                    }
                  newCalendar.splice(newCalendar.indexOf(day),1,newDay)
                }
                })
                updateUserDetail('userCalendar',JSON.stringify(newCalendar))
                setUser({...user ,userCalendar:newCalendar})
                setItemsToAdd({})
              }}
              >{dayName}</button>
            )
          })}
          </div>
           {/*add exercise name to a day of choice  */}
        </>
      )
    }else if(itemsToAdd.type==='day'){
      return(
        <>
            {/* replace a day of choice by the specified day's content*/}
        </>
      )
    }else if(itemsToAdd.type==='workout'){
      return(
        <>
        {/* ask for confermation and replace the entire workout by the chosen one */}
        </>
      )
    }else{
      // error
    }
    }
  return (
    <div
    id="addWorkout"
    style={{display:!itemsToAdd.type ? 'none' : 'flex'}}>
        <RxCross2
        onClick={()=>{
            setItemsToAdd({})
        }}
    />
      <div id="addingContent">
        {innerContent()}
      </div>
    </div>
  )
}

export default AddWorkout