import {Link, NavLink} from 'react-router-dom'
import {CgGym} from 'react-icons/cg'
import {AiFillHome} from 'react-icons/ai'
import {FaQuestion} from 'react-icons/fa'
import {IoIosSettings} from 'react-icons/io'
import {RiUserSearchFill} from 'react-icons/ri'
import { useContext, useEffect, useRef, useState } from 'react'
import DataContext from '../context/DataContext'
const Header = () => {
  const {user ,navigator ,isToggledSieBar ,setIsToggledSieBar}=useContext(DataContext)
  const [windowScroll ,setWindowScroll]=useState()
  
    window.addEventListener('scroll',e=>{
      setWindowScroll(window.scrollY)
  })
  return (
    <header id='header' className={windowScroll>=80 ? 'fixed': 'static'}>
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
            <NavLink to='/peaple'>
              <div className='ancorContent'>
                <RiUserSearchFill/>
                <p>people</p>
              </div>
            </NavLink>
            <NavLink to='/gym'>
              <div className='ancorContent'>
                <CgGym/>
                <p>gym</p>
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
            <Link to='/profile'>
              <img src={user.userPhoto ? user.userPhoto : `/images/${user.userGender}-icon.jpg`}/>
              </Link>
            <Link to='settings'><IoIosSettings/></Link>
            <button onClick={()=>setIsToggledSieBar(!isToggledSieBar)} id='sideBarToggle' className={isToggledSieBar ? 'toggled' : ''}>
              <span></span>
              <span></span>
            </button>
        </div>
    </header>
  )
}

export default Header