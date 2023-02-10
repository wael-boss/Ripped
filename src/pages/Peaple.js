import { useContext, useEffect, useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import UserSearchDisplay from '../components/UserSearchDisplay'
import DataContext from '../context/DataContext'
const Peaple = () => {
  const {getAllUsers ,users}=useContext(DataContext)
  const [userSearch ,setUserSearch]=useState('')
  useEffect(()=>{
    if(users.length) return
    getAllUsers()
  })
  return (
    <main>
      <section id='userSearch'>
        <form onSubmit={(e)=>{
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
      <section id='usersAcounts'>
        {!users.length ?
        <p>no users yet</p> :
        <div id='userContainer'>
          <UserSearchDisplay users={userSearch.length ? users.filter(user=>(user.userName.toLowerCase()).includes(userSearch.toLowerCase())) : users}/>
        </div>}
      </section>
    </main>
  )
}

export default Peaple