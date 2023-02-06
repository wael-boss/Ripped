import {Link, NavLink} from 'react-router-dom'
import {CgGym} from 'react-icons/cg'
import {AiFillHome ,AiFillEdit} from 'react-icons/ai'
import {BsFillCalendarEventFill} from 'react-icons/bs'
import {FaQuestion ,FaCheck} from 'react-icons/fa'
import {IoIosSettings} from 'react-icons/io'
import {TbSwitch} from 'react-icons/tb'
import { useContext, useRef, useState } from 'react'
import DataContext from '../context/DataContext'
const Header = () => {
  const {user ,signOutFunc ,setUser ,UserToLocalStorage ,navigator,muscleAPIcolor ,setMuscleAPIcolor}=useContext(DataContext)
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
        <div id='technicalLinks'>
            <Link to='profile'><img src={user.userPhoto ? user.userPhoto : `/images/${user.userGender}-icon.jpg`}/></Link>
            <Link to='settings'><IoIosSettings/></Link>
        </div>
    </header>
  )
}

export default Header