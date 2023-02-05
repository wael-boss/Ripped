import '../css/signingPage.css'
import {  Route, Routes } from "react-router-dom"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import Missing from './Missing'
import { useContext, useEffect } from 'react'
import DataContext from '../context/DataContext'
import PlatformSignIn from '../components/PlatformSignIn'
const SigningPage = () => {
  const {navigator ,authenticationId}=useContext(DataContext)
  useEffect(()=>{
    console.log(!authenticationId)
    if(!authenticationId) return
  },[])
  return (
    <main id="signingPageMain">
        <section id="formsSection">
          {!authenticationId ? 
          <PlatformSignIn/>
          :
          <>
          <div id="intro">
            <img src='/images/Logo-Red.png'/>
            <h1>Welcome back</h1>
            <p>Please enter your details</p>
          </div>
            <Routes>
              <Route path='/' element={<SignIn/>}/>
              <Route path='/signUp' element={<SignUp/>}/>
              {/* <Route path='/*' element={navigator('/')}/> */}
            </Routes>
            </>}
        </section>
        <section id="backgroundSection">
          {/* <img src="/images/standing.jpg"/> */}
        </section>
    </main>
  )
}

export default SigningPage