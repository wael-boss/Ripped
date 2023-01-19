import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {AiFillEye} from 'react-icons/ai'
import DataContext from "../context/DataContext"
const SignIn = () => {
    const {codeShown ,setCodeShown ,emailRef ,passwordRef ,handleSignIn}=useContext(DataContext)
  return (
    <div>
        <h2 className="signingIdentifier">Sign in</h2>
        <form className="signingForm" onSubmit={(e)=>{
            e.preventDefault()
            handleSignIn()
        }}>
            <input
            ref={emailRef}
            type='email'
            required
            placeholder="enter email"
            />
            <div className="passwordInput">
            <input
            ref={passwordRef}
            type={codeShown ? 'password' : 'text'}
            required
            placeholder="enter password"
            />
            <AiFillEye role='button' style={{
                opacity:codeShown ? '1' : '.3'
            }} onClick={()=>{
                setCodeShown(!codeShown)
                passwordRef.current.focus()
            }}/>
            </div>
            <button type="submit">Continue</button>
        </form>
        <p className='switchSignInMethod'>don't have an acount ? <Link to='/signUp'>Sign up.</Link></p>
    </div>
  )
}

export default SignIn