import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {AiFillEye} from 'react-icons/ai'
import DataContext from "../context/DataContext"
const SignUp = () => {
    const {codeShown ,setCodeShown ,emailRef ,handleSignIn ,passwordCheck ,passwordKeys ,setPasswordKeys}=useContext(DataContext)
  return (
    <div>
        <h2 className="signingIdentifier">Sign up</h2>
        <form className="signingForm" onSubmit={(e)=>{
            e.preventDefault()
            if(passwordCheck.current.value !== passwordKeys){
                passwordCheck.current.value='incorrect'
                passwordCheck.current.focus()
                return
            }
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
            value={passwordKeys}
            type={codeShown ? 'password' : 'text'}
            required
            placeholder="enter password"
            onChange={(e)=>{
                if(passwordKeys.length>=12 && e.nativeEvent.inputType !== 'deleteContentBackward') return
                setPasswordKeys(e.target.value)
            }}
            onPaste={(e)=>{
                e.preventDefault()
            }}
            />
            <AiFillEye role='button' style={{
                opacity:codeShown ? '1' : '.3'
            }} onClick={()=>{
                setCodeShown(!codeShown)
            }}/>
            <p>{passwordKeys.length}</p>
            </div>
            <div className="passwordInput">
            <input
            ref={passwordCheck}
            type={codeShown ? 'password' : 'text'}
            required
            placeholder="re-enter password"
            />
            <AiFillEye role='button' style={{
                opacity:codeShown ? '1' : '.3'
            }} onClick={()=>{
                setCodeShown(!codeShown)
            }}/>
            </div>
            <button type="submit">Continue</button>
        </form>
        <p className='switchSignInMethod'><Link to='/'>Back </Link>to signing in.</p>
    </div>
  )
}

export default SignUp
 // 
 // 
