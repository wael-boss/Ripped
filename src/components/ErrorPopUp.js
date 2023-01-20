import { useContext } from "react"
import DataContext from "../context/DataContext"

const ErrorPopUp = () => {
    const {error}=useContext(DataContext)
  return (
    <div id="errorPopUp" style={{
        transform:error ? 'translateY(0%)' : ' translateY(-100%)'
    }}><p>{error}</p></div>
  )
}

export default ErrorPopUp