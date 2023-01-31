import { useContext } from "react"
import DataContext from "../context/DataContext"
import {RxCross2} from 'react-icons/rx'
const AddWorkout = () => {
    const {itemsToAdd ,setItemsToAdd}=useContext(DataContext)
  return (
    <div
    id="addWorkout"
    style={{display:!itemsToAdd.type ? 'none' : 'flex'}}>
        <RxCross2
        onClick={()=>{
            setItemsToAdd({})
        }}
        />
        {itemsToAdd.type==='exercise' ?
        <div>
           {/*add exercise name to a day of choice  */}
           p
        </div> : itemsToAdd.type==='day' ?
        <div>
            {/* replace a day of choice by the specified day's content*/}
        </div> :
        <div>
        {/* ask for confermation and replace the entire workout by the chosen one */}
        </div>}
    </div>
  )
}

export default AddWorkout