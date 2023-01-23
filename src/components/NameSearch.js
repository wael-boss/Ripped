import { useContext } from "react"
import DataContext from "../context/DataContext"
import {FaSearch} from 'react-icons/fa'

const NameSearch = () => {
  const {searchParams ,setSearchParams}=useContext(DataContext)
  const EN=searchParams.get('EN')
  return (
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault()

          }}>
            <input
            type='text'
            value={EN}
            onChange={(e)=>{
              setSearchParams({...searchParams,EN:e.target.value})
            }}
            />
            <button type='submit'><FaSearch/></button>
        </form>
    </div>
  )
}

export default NameSearch