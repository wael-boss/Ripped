import { Link, NavLink, Outlet} from 'react-router-dom'
import DataContext from "../context/DataContext"
import '../css/Settings.css'
import {BiLogOut} from 'react-icons/bi'
import { useContext } from 'react'
const Settings = () => {
  const {signOutFunc}=useContext(DataContext)
  return (
    <main id='settingsPage'>
      <section id='settingsSideBarSection'>
        <div id='slowSettingAcces'>
          <NavLink to='edit_profile'>edit profile</NavLink>
          <NavLink to='edit_color'>color change</NavLink>
          <NavLink to='change_password'>change password</NavLink>
          <NavLink to='delete_acount'>delete acount</NavLink>
        </div>
        <div id='fastSettingAcces'>
          <button onClick={signOutFunc}><BiLogOut/> log out</button>
        </div>
      </section>
      <section id='settingsMainContentSection'>
        <Outlet/>
      </section>
    </main>
  )
}

export default Settings