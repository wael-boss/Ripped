import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {AiFillEye} from 'react-icons/ai'
import DataContext from "../context/DataContext"
const SignUp = () => {
    const {navigator ,codeShown ,setCodeShown ,emailRef ,handleSignUp ,passwordCheck ,signUpPasswordKeys ,setSignUpPasswordKeys}=useContext(DataContext)
  return (
    <div className="formsContainer">
        <div className="signingInfo">
            <h2>sign up</h2>
            <p>this acount's email and password only work on this website</p>
        </div>
        <form className="signingForm" onSubmit={(e)=>{
            e.preventDefault()
            if(signUpPasswordKeys.length<=6){
                setSignUpPasswordKeys('too short')
                return
            }
            if(passwordCheck.current.value !== signUpPasswordKeys){
                passwordCheck.current.value='incorrect'
                passwordCheck.current.focus()
                return
            }
            handleSignUp()
            navigator('/')
        }}>
            <input
            ref={emailRef}
            type='email'
            required
            placeholder="enter email"
            />
            <div className="passwordInput">
            <input
            style={{color:signUpPasswordKeys.length<=6 ? 'red' : 'green'}}
            value={signUpPasswordKeys}
            type={codeShown ? 'password' : 'text'}
            required
            placeholder="enter password"
            onChange={(e)=>{
                if(signUpPasswordKeys.length>=24 && e.nativeEvent.inputType !== 'deleteContentBackward') return
                setSignUpPasswordKeys(e.target.value)
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
            <p>{signUpPasswordKeys.length}</p>
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
