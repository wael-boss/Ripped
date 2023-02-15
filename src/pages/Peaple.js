import { useContext, useEffect, useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import UserSearchDisplay from '../components/UserSearchDisplay'
import DataContext from '../context/DataContext'
import '../css/Peaple.css'
const Peaple = () => {
  const {getAllUsers ,users ,navigator}=useContext(DataContext)
  const [userSearch ,setUserSearch]=useState('')
  const location=useLocation()
  const usersCollection=!location.state ? users : location.state.followers
  useEffect(()=>{
    if(!users.lenght)
    getAllUsers()
  },[])
  return (
    <main>
      <section id='userSearch'>
        <form id='userSearchForm' onSubmit={(e)=>{
          e.preventDefault()
        }}>
          <input
          value={userSearch}
          onChange={(e)=>{
            setUserSearch(e.target.value)
          }}
          placeholder='search for your gym bro'
          />
          <FiSearch type='submit'/>
        </form>
      </section>
      {!!location.state &&
      <section id='userFollowersIntro'>
        <h1 onClick={()=>{
          const filteredUser=users.filter(user=>user.userName===location.state.user)[0]
          navigator('profile' ,{state:{user:filteredUser}})
        }}>
          {location.state.user}'s followers</h1>
        </section>}
      <section id='usersAcounts'>
        {!users.length ?
        <p>no users yet</p> :
          <UserSearchDisplay users={userSearch.length ? usersCollection.filter(user=>(user.userName.toLowerCase()).includes(userSearch.toLowerCase())) : usersCollection}/>}
      </section>
    </main>
  )
}

export default Peaple