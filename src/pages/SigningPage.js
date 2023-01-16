import { useContext } from "react"
import DataContext from "../context/DataContext"

const SigningPage = () => {
    const {signedIn ,setSignedIn}=useContext(DataContext)
  return (
    <main>
        <p onClick={()=>{
            setSignedIn(!signedIn)
        }}>SigningPage</p>
    </main>
  )
}

export default SigningPage