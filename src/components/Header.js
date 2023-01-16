import {NavLink} from 'react-router-dom'
import {CgGym} from 'react-icons/cg'
import {AiFillHome ,AiOutlineUser} from 'react-icons/ai'
import {BsFillCalendarEventFill} from 'react-icons/bs'
import {FaQuestion} from 'react-icons/fa'
import {IoIosSettings} from 'react-icons/io'
const Header = () => {
  return (
    <header>
        <div id='logoContainer'>
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
            <NavLink to='/c'>
              <div className='ancorContent'>
                <FaQuestion/>
                <p>about</p>
              </div>
            </NavLink>
        </nav>
        <div id='settingsContainer'>
          <div><AiOutlineUser/></div>
          <div className='settingsToggle'>
            <IoIosSettings/>
            <div className='settings'>
              <div className='setting'><p>1111111111</p></div>
              <div className='setting'>22222222222222</div>
              <div className='setting'><p>3333333333333333333333</p></div>
            </div>
            </div>
        </div>
    </header>
  )
}

export default Header