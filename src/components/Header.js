import {NavLink} from 'react-router-dom'
import {CgGym} from 'react-icons/cg'
import {AiFillHome ,AiFillEdit} from 'react-icons/ai'
import {BsFillCalendarEventFill} from 'react-icons/bs'
import {FaQuestion ,FaCheck} from 'react-icons/fa'
import {IoIosSettings} from 'react-icons/io'
import {TbSwitch} from 'react-icons/tb'
import { useContext, useRef, useState } from 'react'
import DataContext from '../context/DataContext'
const Header = () => {
  const {user ,signOut ,setUser ,UserToLocalStorage ,navigator}=useContext(DataContext)
  const [isEditing ,setIsEditing]=useState(false)
  const nameChangeRef=useRef()
  return (
    <header>
        <div id='logoContainer' onClick={()=>{
          navigator('/')
        }}>
          <img src='/images/Logo-Red.png' alt='R'/>
          <p>IPPED</p>
        </div>
        <nav>
            <NavLink to='/'>
              <div className='ancorContent'>
                <AiFillHome/>
                <p>home</p>
              </div>
            </NavLink>
            <NavLink to='/gym'>
              <div className='ancorContent'>
                <CgGym/>
                <p>gym</p>
              </div>
            </NavLink>
            <NavLink to='/calendar'>
              <div className='ancorContent'>
                <BsFillCalendarEventFill/>
                <p>calendar</p>
              </div>
            </NavLink>
            <NavLink to='/about'>
              <div className='ancorContent'>
                <FaQuestion/>
                <p>about</p>
              </div>
            </NavLink>
        </nav>
        <div id='settingsContainer'>
          <div className='userAcount , settingsToggle'>
            <img src={user.userPhoto ? user.userPhoto : `/images/${user.userGender}-icon.jpg`}/>
            <div className='settings'>
              <div className='setting'>
                {isEditing ?
                <input
                value={user.userName}
                onChange={(e)=>{
                  const obj={...user ,userName:e.target.value}
                  setUser(obj)
                }}
                /> : <p>{user.userName}</p>}
                <div onClick={()=>{
                  setIsEditing(!isEditing)
                  if(isEditing){
                    UserToLocalStorage()
                  }
                }}>{isEditing ? <FaCheck/> : <AiFillEdit/>}</div>
              </div>
              <div className='setting'><p>{user.userEmail}</p></div>
              <div className='setting'>
                <p>gender: {user.userGender}</p>
                <div>
                <TbSwitch onClick={()=>{
                  const OBJ={
                    ...user,
                    userGender:user.userGender==='male' ? 'female' : 'male'
                  }
                  setUser(OBJ)
                }}/>
                </div>
              </div>
              <div className='setting'><button onClick={signOut}>sign out</button></div>
            </div>
            </div>
          <div className='settingsToggle'>
            <IoIosSettings/>
            <div className='settings'>
              <div className='setting'><p>1111111111</p></div>
              <div className='setting'><p>22222222222222</p></div>
              <div className='setting'><p>3333333333333333333333</p></div>
            </div>
            </div>
        </div>
    </header>
  )
}

export default Header