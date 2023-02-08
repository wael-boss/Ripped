import { useContext, useState } from "react"
import { useLocation } from "react-router-dom"
import DataContext from "../context/DataContext"
import {MdArrowDropDown} from "react-icons/md"
import {AiOutlinePlus ,AiOutlineMinus} from "react-icons/ai"
import '../css/Profile.css'
const Profile = () => {
  const {user ,navigator ,setItemsToAdd ,removeExeciseFromCalendar}=useContext(DataContext)
  const location=useLocation()
  const locationUser=!location.state ? null : location.state.user
  const [userProfile ,setUserProfile]=useState(locationUser || user)
  const [isShowingMore ,setIsShowingMore]=useState(false)
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
        {userProfile.userCalendar.map(day=>{
          const dayCounter=day[0]
          const dayName=day[1]
          const dayExercises=day[2]
          return(
            <div key={dayCounter} className="day">
              <div className="dayCounter"><hr/><p>{dayCounter.substring(0 ,3)}</p><hr/></div>
              <div className="dayName"><hr/><p>{dayName}</p><hr/></div>
              <div className="dayExercises" style={{gridTemplateColumns:!dayExercises.length ? '1fr' : 'repeat(2 ,1fr)'}}>
                {!dayExercises.length ? 
                <div>
                    <hr/>
                </div>
                    : 
                dayExercises.map(exercise=>{
                  return(
                    <div>
                      <p onClick={()=>{
                        // look at exercise details
                        navigator(`/exerciseFocus?name=${exercise.split(' ').join('+')}`)
                      }}>{exercise}
                      </p>
                      <hr/>
                      <div className="calenadarBtns">
                      {!!locationUser &&<AiOutlinePlus onClick={()=>{
                        // add workout
                        setItemsToAdd({
                          type:'exercise',
                          data:exercise
                        })
                      }}/>}
                      {!locationUser &&<AiOutlineMinus onClick={()=>{
                        removeExeciseFromCalendar(day ,exercise)
                      }}/>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Profile