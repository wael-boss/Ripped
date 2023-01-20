import { useContext, useEffect } from "react"
import DataContext from "../context/DataContext"

const Missing = () => {
    const {navigator}=useContext(DataContext)
    useEffect(()=>{
        setTimeout(()=>{navigator('/')},3000)
    })
    return(
        <main>wrong link</main>
    )
}

export default Missing