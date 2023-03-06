import { useContext } from "react"
import { NavLink } from "react-router-dom"
import DataContext from "../context/DataContext"
import {FaFacebookF, FaTwitter, FaInstagram, FaLinkedin} from 'react-icons/fa'
const Footer = () => {
  const {user}=useContext(DataContext)
  return (
    <footer>
      <div id="signature">
        <div id="signatureLogo">
          <img src="images/Logo-White.png" alt="R"/>
          <p>IPPED</p>
        </div>
        <div id="FooterAncors">
          <NavLink to='/'>home</NavLink> | <NavLink to='/peaple'>peaple</NavLink> | <NavLink to='/gym'>gym</NavLink> | <NavLink to='profile'>profile</NavLink> | <NavLink to='settings'>settings</NavLink>
        </div>
        <p id="copyRight">Copyright &copy; <span>Ripped</span> all rights reserved</p>
        <div id="platforms">
          <p>socials</p>
            <div>
              <p className="platform"><FaFacebookF/></p>
              <p className="platform"><FaTwitter/></p>
              <p className="platform"><FaInstagram/></p>
              <p className="platform"><FaLinkedin/></p>
            </div>
        </div>
      </div>
      <div id="links">
        <div className="linkSection">
          <h3>Company</h3>
          <p>About Us</p>
          <p>Our Services</p>
          <p>Privacy Policy</p>
          <p>Affiliate Program</p>
        </div>
        <div className="linkSection">
          <h3>Get Help</h3>
          <p>FAQ</p>
          <p>Shipping</p>
          <p>Order Status</p>
          <p>Payment Options</p>
        </div>
      </div>
      <div id="contactForm">
        <form onSubmit={e=>e.preventDefault()}>
          <div>
            <label>name: </label>
            <input
            type='text'
            placeholder={user.userName}
            onDoubleClick={e=>e.target.value=user.userName}
            />
          </div>
          <div>
            <label>email: </label>
            <input
            type='email'
            placeholder={user.userEmail}
            onDoubleClick={e=>e.target.value=user.userEmail}
            />
          </div>
          <div>
            <label>message: </label>
            <textarea
            placeholder="your message"
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </footer>
  )
}

export default Footer