import { createContext, useState } from "react";
import {auth ,provider} from '../Config'
import {signInWithPopup} from 'firebase/auth'

const DataContext=createContext({})

export const DataProvider=({children})=>{
    //logic
    console.log(JSON.parse(localStorage.getItem('user')))
    const [user ,setUser]=useState(JSON.parse(localStorage.getItem('user')) || {
        userName:null,
        userEmail:null,
        userPhoto:null,
        userId:null
      })
        const handleSignIn=async()=>{
          const data=await signInWithPopup(auth ,provider)
          console.log(data)
          const userOBJ={
            userName:data.user.displayName,
            userEmail:data.user.email,
            userPhoto:data.user.photoURL,
            userId:data.user.uid
          }
          localStorage.setItem('user' ,JSON.stringify(userOBJ))
          setUser(userOBJ)
        }
        const signOut=()=>{
            localStorage.removeItem('user')
            setUser({
                userName:null,
                userEmail:null,
                userPhoto:null,
                userId:null
            })
        }
return(
    <DataContext.Provider value={{
        user ,handleSignIn ,signOut
    }}>
        {children}
    </DataContext.Provider>
)
}

export default DataContext