import '../css/SigningPage.css'
import {  Link, Route, Routes } from "react-router-dom"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import Missing from './Missing'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import PlatformSignIn from '../components/PlatformSignIn'
const SigningPage = () => {
  const {authenticationId}=useContext(DataContext)
  return (
    <main id="signingPageMain">
        <section id="formsSection">
          {!authenticationId.length ?
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
              <Route path='/*' element={<SignIn/>}/>
            </Routes>
            </>}
        </section>
        <section id="backgroundSection">
          <img src="https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGd5bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
        </section>
    </main>
  )
}

export default SigningPage