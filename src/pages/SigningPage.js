import { useContext } from "react"
import DataContext from "../context/DataContext"

const SigningPage = () => {
  const {handleSignIn}=useContext(DataContext)
  return (
    <main>
        <button onClick={()=>{
          handleSignIn()
        }}>sign in with google</button>
    </main>
  )
}

export default SigningPage