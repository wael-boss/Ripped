import { useContext } from "react"
import DataContext from "../context/DataContext"

const UserSearchDisplay = ({users}) => {
  const {authenticationId ,navigator}=useContext(DataContext)
  return (
    <div id='usersContainer'>
      {users.map(user=>{
        if(user.deletedAcounts==undefined){
        return(
      <div className="userContainer" onClick={()=>{
        navigator('/profile' ,user.userId==authenticationId ? '' : {state:{user:user}})
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
    </div>
    )}
    if(user.deletedAcounts>0){
      return(
      <div className="userContainer">
        <div className="userDetails">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCg82ukYsHu6RhCL5frZWulTBv0161i72wWg&usqp=CAU"/>
        <p>{user.deletedAcounts} {user.deletedAcounts==1 ? 'follower': 'followers'} deleted their acounts</p>
        </div>
      </div>)
    }
    })}
  </div>
  )
}

export default UserSearchDisplay