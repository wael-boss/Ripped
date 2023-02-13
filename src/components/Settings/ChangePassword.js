import { useContext } from "react"
import DataContext from "../../context/DataContext"

const ChangePassword = () => {
  const {}=useContext(DataContext)
  return (
  <div id='settingContainer'>
    <div id="settingContent">
    <div className='settingIntro'>
      <h1>Edit profile</h1>
      <h2>edit your profile information</h2>
    </div>
    <form onSubmit={(e)=>{
        e.preventDefault()
    }}>
        <input
        placeholder="old"
        />
        <input
        placeholder="new"
        />
        <input
        placeholder="confirm new"
        />
        <button type="submit">confirm</button>
    </form>
    </div>
  </div>
  )
}

export default ChangePassword