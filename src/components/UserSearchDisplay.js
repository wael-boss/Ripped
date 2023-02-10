import { useContext } from "react"
import DataContext from "../context/DataContext"

const UserSearchDisplay = ({users}) => {
  const {navigator}=useContext(DataContext)
  return (
    <div>{users.map(user=>{
      return(<p onClick={()=>{
        navigator('/profile' ,{state:{user:user}})
      }}>{user.userName}</p>)
    })}</div>
  )
}

export default UserSearchDisplay