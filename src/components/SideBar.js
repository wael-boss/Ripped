import { Link, NavLink } from "react-router-dom"
import {CgGym} from 'react-icons/cg'
import {AiFillHome} from 'react-icons/ai'
import {FaQuestion} from 'react-icons/fa'
import {IoIosSettings} from 'react-icons/io'
import {RiUserSearchFill} from 'react-icons/ri'
import { useContext } from "react"
import DataContext from "../context/DataContext"
const SideBar = () => {
  const {user ,isToggledSieBar ,setIsToggledSieBar}=useContext(DataContext)
  return (
    <aside style={{transform:isToggledSieBar ? 'translateX(0%)' : 'translateX(100%)'}}>
        <div id="sideBarContent" onClick={()=>setIsToggledSieBar(!isToggledSieBar)}>
            <Link to='/profile'><img src={user.userPhoto}/>{user.userName}</Link>
            <NavLink to='/'><AiFillHome/>home</NavLink>
            <NavLink to='/peaple'><RiUserSearchFill/>peaple</NavLink>
            <NavLink to='/gym'><CgGym/>gym</NavLink>
            <NavLink to='/about'><FaQuestion/>about</NavLink>
            <NavLink to='/settings'><IoIosSettings/>settings</NavLink>
        </div>
    </aside>
  )
}

export default SideBar