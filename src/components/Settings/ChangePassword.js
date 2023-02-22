import { useContext, useRef } from "react"
import DataContext from "../../context/DataContext"

const ChangePassword = () => {
  const {updateUserDetail ,user ,errorOccurred ,navigator ,setUser}=useContext(DataContext)
  const oldPassword=useRef()
  const newPassword=useRef()
  const newPasswordCheck=useRef()
  return (
  <div id='settingContainer'>
    <div id="settingContent">
    <div className='settingIntro'>
      <h1>change password</h1>
      <h2>input your the new password and confirm it</h2>
    </div>
    <form id="changePasswordForm" onSubmit={(e)=>{
        e.preventDefault()
        if(oldPassword.current.value!==user.userPassword){
            oldPassword.current.value=''
            errorOccurred('old password is wrong')
            return
        }
        if(newPassword.current.value!==newPasswordCheck.current.value){
            newPassword.current.value='' 
            newPasswordCheck.current.value='' 
            errorOccurred('confirm the new password')
            return
        }
        if(newPassword.current.value<7){
            errorOccurred('password must be over 7 chars')
            return
        }
        updateUserDetail('userPassword' ,newPassword.current.value)
        setUser(prev=>{
            const newUser={...prev ,userPassword:newPassword.current.value}
            return newUser
        })
        navigator('/profile')
    }}>
        <input
        placeholder="enter old password"
        type='text'
        ref={oldPassword}
        required
        />
        <input
        placeholder="enter new password"
        type='text'
        ref={newPassword}
        required
        />
        <input
        placeholder="confirm new password"
        type='text'
        ref={newPasswordCheck}
        required
        />
        <button type="submit">confirm</button>
    </form>
    </div>
  </div>
  )
}

export default ChangePassword