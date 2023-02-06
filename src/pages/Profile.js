import { useContext, useState } from "react"
import { useLocation } from "react-router-dom"
import DataContext from "../context/DataContext"
import {MdArrowDropDown} from "react-icons/md"
import '../css/Profile.css'
const Profile = () => {
  const {user}=useContext(DataContext)
  const location=useLocation()
  const locationUser=!location.state ? null : location.state.user
  const [userProfile ,setUserProfile]=useState(locationUser || user)
  const [isShowingMore ,setIsShowingMore]=useState(true)
  return (
    <main id="profilePage">
      <section id="profileIntro">
        <img src={userProfile.userPhoto}/>
        <div id="profileGlmipse">
          <div id="headers">
          <h1>{userProfile.userName}</h1>
          <p>{userProfile.userCrowns.length}👑</p>
          </div>
          <div id="subHeaders">
            <h2>{userProfile.userBio}</h2>
          </div>
        </div>
        <MdArrowDropDown style={{transform:isShowingMore ? 'rotate(-180deg)' : 'rotate(0deg)'}} onClick={()=>{
          setIsShowingMore(!isShowingMore)
        }}/>
      </section>
      {isShowingMore &&
      <section id="moreInformation">
        <p>age: {!userProfile.userAge ? 'not mentioned' : userProfile.userAge}</p>
        <p>height: {!userProfile.userHeight ? 'not mentioned' : userProfile.userHeight}</p>
        <p>weight: {!userProfile.userWeight ? 'not mentioned' : userProfile.userWeight}</p>
        <p>gender: {!userProfile.userGender ? 'not mentioned' : userProfile.userGender}</p>
      </section>}
      <section id="calendar">
        {/* userCalendar content */}
      </section>
    </main>
  )
}

export default Profile