import { useContext } from "react"
import DataContext from "../context/DataContext"

const UserSearchDisplay = ({users}) => {
  const {navigator}=useContext(DataContext)
  return (
    <div id='usersContainer'>
      {users.map(user=>{
      return(<div className="userContainer" onClick={()=>{
        navigator('/profile' ,{state:{user:user}})
      }}>
        <div className="userDetails">
          <img src={user.userPhoto}/>
          <div>
            <p>{user.userName}</p>
            {user.userAge!=null &&
            <p style={{opacity:.4 ,fontSize:'var(--font-size-S)'}}>{user.userAge}
            </p>}
          </div>
        </div>
        <p>👑{user.userCrowns.length}</p>
    </div>)
    })}</div>
  )
}

export default UserSearchDisplay