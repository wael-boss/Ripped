import { useContext } from "react"
import DataContext from "../context/DataContext"
import {RxCross2} from 'react-icons/rx'
const AddWorkout = () => {
    const {addExeciseToCalendar ,user ,itemsToAdd ,setItemsToAdd}=useContext(DataContext)
    const innerContent=()=>{
      if(itemsToAdd.type==='exercise'){
      return(
        <>
          <h3>add this exercise to a day of choice</h3>
          <div className="daysContainer">
          {user.userCalendar.map(day=>{
            return(
              <button
              key={day[1]}
              title={
                day[2].map(exercise=>{
                  return exercise
                })
              }
              onClick={()=>{addExeciseToCalendar(day)}}
              >{day[1]}</button>
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