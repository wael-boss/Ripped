import { useContext } from "react"
import DataContext from "../../context/DataContext"
import NewProfileData from "../NewProfileData"

const EditProfile = () => {
  const {editUserDetails}=useContext(DataContext)
  return (
  <div id='settingContainer'>
    <div id="settingContent">
    <div className='settingIntro'>
      <h1>Edit profile</h1>
      <h2>edit your profile information</h2>
    </div>
    <NewProfileData/>
    </div>
    <div id="settingsConfirmatioButtonContainer">
      <button className="approve" onClick={()=>{
        editUserDetails()
      }}>save</button>
    </div>
  </div>
  )
}

export default EditProfile