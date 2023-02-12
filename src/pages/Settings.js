import { Link, NavLink, Outlet} from 'react-router-dom'
import '../css/Settings.css'

const Settings = () => {
  return (
    <main id='settingsPage'>
      <section id='settingsSideBarSection'>
        <NavLink to='edit_profile'>edit profile</NavLink>
        <NavLink to='edit_color'>color change</NavLink>    
      </section>
      <section id='settingsMainContentSection'>
        <Outlet/>
      </section>
    </main>
  )
}

export default Settings