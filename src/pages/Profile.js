import { useContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import DataContext from "../context/DataContext"
import {MdArrowDropDown ,MdWork} from "react-icons/md"
import {AiOutlinePlus ,AiOutlineMinus ,AiOutlineFieldNumber} from "react-icons/ai"
import {GoSettings} from "react-icons/go"
import {BsGenderAmbiguous ,BsGenderMale ,BsGenderFemale} from "react-icons/bs"
import {FaTape} from "react-icons/fa"
import {TbScaleOutline} from "react-icons/tb"
import {BiBody} from "react-icons/bi"
import {GiMeat ,GiFireBowl} from "react-icons/gi"
import '../css/Profile.css'
const Profile = () => {
  const {users ,calcBMI ,calcBMR ,calcTDEE ,userProfile ,setUserProfile ,coronateUser ,emptyCalendar ,emptyDay ,errorOccurred ,user ,navigator ,setItemsToAdd ,removeExeciseFromCalendar ,editDayName}=useContext(DataContext)
  const location=useLocation()
  const locationUser=!location.state ? null : location.state.user
  const [isShowingMore ,setIsShowingMore]=useState(false)
  const [isShowingSettings ,setIsShowingSettings]=useState(false)
  const [settingOption ,setSettingOption]=useState(0)
  const [dayToEdit ,setDayToEdit]=useState('')
  const editInputRef=useRef()
  useEffect(()=>{
    setUserProfile(!locationUser ? user : locationUser)
  },[locationUser])
  return (
    <main id="profilePage">
      <section id="profileIntro">
        <img src={userProfile.userPhoto}/>
        <div id="profileGlmipse">
          <div id="headers">
          <h1>{userProfile.userName}</h1>
          <p onClick={()=>{
            errorOccurred(`${userProfile.userName} has no followers`)
            const allFollowing=users.filter(user=>userProfile.userCrowns.includes(user.userId))
            navigator('/peaple' ,{state:{followers:[...allFollowing, {deletedAcounts:userProfile.userCrowns.length-allFollowing.length ,userName:'deleted'}],user:userProfile.userName}} )
          }}>{userProfile.userCrowns.length}👑</p>
          </div>
          <div id="subHeaders">
            <h2>{userProfile.userBio}</h2>
          </div>
        </div>
        {!!locationUser &&<button id="coronateBtn" onClick={()=>{
          // salute the user func
          coronateUser(userProfile)
        }}>+👑</button>}
        {!locationUser &&<button id="editProfileAncorBtn" onClick={()=>navigator('/settings/edit_profile')}>Edit profile</button>}
        <MdArrowDropDown style={{transform:isShowingMore ? 'rotate(-180deg)' : 'rotate(0deg)'}} onClick={()=>{
          setIsShowingMore(!isShowingMore)
        }}/>
      </section>
      {isShowingMore &&
      <section id="moreInformation">
        <div className="infoContainer"><AiOutlineFieldNumber/><p>age: {!userProfile.userAge ? 'not mentioned' : userProfile.userAge}</p></div>
        <div className="infoContainer"><FaTape/><p>height: {!userProfile.userHeight ? 'not mentioned' : userProfile.userHeight} cm</p></div>
        <div className="infoContainer"><TbScaleOutline/><p>weight: {!userProfile.userWeight ? 'not mentioned' : userProfile.userWeight} Kg</p></div>
        <div className="infoContainer">{!userProfile.userGender ? <BsGenderAmbiguous/> : userProfile.userGender==='male' ? <BsGenderMale style={{color:'#007ecc'}}/> : <BsGenderFemale style={{color:'#ff00ae'}}/>}<p>gender: {!userProfile.userGender ? 'not mentioned' : userProfile.userGender}</p></div>
        <div className="infoContainer"><BiBody/>{calcBMI(userProfile)}</div>
        <div className="infoContainer"><GiMeat/><p>BMR: {calcBMR(userProfile)} cal</p></div>
        <div className="infoContainer"><GiFireBowl/><p>TDEE: {calcTDEE(userProfile)} cal</p></div>
        <div className="infoContainer"><MdWork/><p>activity level: {!userProfile.userActivityLevel ? 'not mentioned' : userProfile.userActivityLevel}</p></div>
      </section>}
      <section id="calendarSection">
        {!locationUser &&<button id="calendarLightSettingsContainer" onClick={()=>{
          setIsShowingSettings(!isShowingSettings)
        }}>
          <GoSettings
        /></button>}
        {isShowingSettings &&
        <div id="lightSettings">
          <div id="settingsOptions">
            <p style={{backgroundColor:settingOption===1 ? "var(--shade1)" : ''}} onClick={()=>setSettingOption(1)}>edit a day's name</p>
            <p style={{backgroundColor:settingOption===2 ? "var(--shade1)" : ''}} onClick={()=>setSettingOption(2)}>empty a day</p>
            <p style={{backgroundColor:settingOption===3 ? "var(--shade1)" : ''}} onClick={()=>setSettingOption(3)}>empty calendar</p>
          </div>
          <div id="settingsLogic">
            {settingOption===1 &&
            <div className="settingContent">
              <h2>re-name a day of choice with what ever you deem fitting</h2>
              <div className="dayContainer">
                {userProfile.userCalendar.map(day=>{
                return(<button onClick={()=>{
                  setDayToEdit(day[1])
                  editInputRef.current.value=''
                }} style={{backgroundColor:dayToEdit===day[1] ? 'var(--color2)' : 'var(--shade5)'}}>{day[1]}</button>)
              })}</div>
              <form onSubmit={(e)=>{
                e.preventDefault()
                if(!dayToEdit.length || !editInputRef.current.value.length){
                  errorOccurred('unvalid input')
                  return
              }
              editDayName(userProfile.userCalendar.filter(day=>day[1]===dayToEdit)[0] ,editInputRef.current.value)
              editInputRef.current.value=''
              }}>
              <input
              ref={editInputRef}
              placeholder={!dayToEdit.length ? 'choose a day' : 'editing '+dayToEdit}
              />
              <button type="submit">submit</button>
              </form>
            </div>}
            {settingOption===2 &&
            <div className="settingContent">
              <h2>click on the day you want to be emptied of exercises</h2>
                <div className="dayContainer">
                  {userProfile.userCalendar.map(day=>{
                    return(<button onClick={()=>{
                      emptyDay(day)
                    }}>{day[1]}</button>)
                  })}
                </div>
              </div>}
            {settingOption===3 &&
            <div className="settingContent">
              <h2>by confirming the calendar will get back to default state</h2>
              <button onClick={emptyCalendar}>confirm</button>
            </div>}
          </div>
        </div>}
        <div id="calendar">
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
                      <p style={{cursor:'pointer'}} onClick={()=>{
                        // look at exercise details
                        navigator(`/exercise_focus?name=${exercise.split(' ').join('+')}`)
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
        </div>
      </section>
    </main>
  )
}

export default Profile