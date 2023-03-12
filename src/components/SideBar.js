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
        <div id="sideBarContent">
            <Link onClick={()=>setIsToggledSieBar(!isToggledSieBar)} to='/profile'><img src={user.userPhoto}/>{user.userName}</Link>
            <NavLink onClick={()=>setIsToggledSieBar(!isToggledSieBar)}to='/'><AiFillHome/>home</NavLink>
            <NavLink onClick={()=>setIsToggledSieBar(!isToggledSieBar)}to='/peaple'><RiUserSearchFill/>peaple</NavLink>
            <NavLink onClick={()=>setIsToggledSieBar(!isToggledSieBar)}to='/gym'><CgGym/>gym</NavLink>
            <NavLink onClick={()=>setIsToggledSieBar(!isToggledSieBar)}to='/about'><FaQuestion/>about</NavLink>
            {window.innerWidth<=450 ?
            <details>
              <summary><IoIosSettings/>settings</summary>
              <div id="settingLinks">
              <NavLink to='/settings/edit_profile'>edit profile</NavLink>
              <NavLink to='/settings/edit_color'>color change</NavLink>
              <NavLink to='/settings/change_password'>change password</NavLink>
              <NavLink to='/settings/delete_acount'>delete acount</NavLink>
            </div>
            </details>
            :
            <NavLink onClick={()=>setIsToggledSieBar(!isToggledSieBar)} to='/settings'><IoIosSettings/>settings</NavLink>}
        </div>
    </aside>
  )
}

export default SideBar