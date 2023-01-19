import { useContext } from "react"
import DataContext from "../context/DataContext"
import {FcGoogle} from "react-icons/fc"
import '../css/signingPage.css'
import { Link, Route, Routes } from "react-router-dom"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
const SigningPage = () => {
  const {handleSignIn}=useContext(DataContext)
  return (
    <main id="signingPageMain">
        {/* <button onClick={()=>{
          handleSignIn()
        }}><FcGoogle/></button> */}
        <section id="formsSection">
          <div id="intro">
            <img src='/images/Logo-Red.png'/>
            <h1>Welcome back</h1>
            <p>Please enter your details</p>
          </div>
            <Routes>
              <Route path='/' element={<SignIn/>}/>
              <Route path='/signUp' element={<SignUp/>}/>
            </Routes>
        </section>
        <section id="backgroundSection">
          {/* <img src="/images/standing.jpg"/> */}
        </section>
    </main>
  )
}

export default SigningPage