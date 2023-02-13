import { useContext, useRef } from "react"
import DataContext from "../../context/DataContext"

const DeleteAcount = () => {
  const {deleteAcount}=useContext(DataContext)
  const passCheck=useRef()
  return (
  <div id='settingContainer'>
    <div id="settingContent">
    <div className='settingIntro'>
      <h1>Delete acount</h1>
      <h2>enter you password to confirm the delition (once deleted all data will be lost)</h2>
    </div>
    <form id="deleteAcountForm" onSubmit={(e)=>{
        e.preventDefault()
        deleteAcount(passCheck.current.value)
    }}>
        <input
        type='text'
        placeholder="password"
        ref={passCheck}
        />
        <button type="submit">confirm</button>
    </form>
    </div>
  </div>
  )
}

export default DeleteAcount