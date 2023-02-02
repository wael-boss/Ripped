import { useState } from "react"
import { FaFacebookF} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
const PlatformSignIn = () => {
  const [isShowingMore ,setIsShowingMore]=useState(false)
  const Introduction="Welcome to Ripped, your one-stop fitness destination! We offer a wide range of workouts and visual guides, plus fitness calculators to help you reach your goals. Stay accountable with friends and family by sharing your workout plans. Suitable for all fitness levels, Ripped has everything you need to get ripped!"
  return (
    <div id="introToSite">
      <div id="siteDetails">
        <img src='/images/Logo-Red.png'/>
        <h1>Ripped</h1>
        <h2 className="slogan">Lift to get Ripped</h2>
        {isShowingMore ? 
        <p>{Introduction}<span onClick={()=>{
          setIsShowingMore(false)
         }}>show less</span></p>
         :
         <p>{Introduction.slice(0 ,Introduction.length/2)}<span onClick={()=>{
          setIsShowingMore(true)
         }}>...</span></p>
         }
      </div>
      <div id="signingToPlatform">
        <p>start by confirming that you are not a robot</p>
        <p>using</p>
        <div><FcGoogle title="google"/> -or- <FaFacebookF title="facebook" style={{color:'#4267B2'}}/></div>
      </div>
    </div>
  )
}

export default PlatformSignIn