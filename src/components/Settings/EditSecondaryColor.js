import { useContext } from 'react'
import DataContext from '../../context/DataContext'
import { colord } from 'colord'

const EditSecondaryColor = () => {
  const {setMuscleAPIcolor ,muscleAPIcolor}=useContext(DataContext)
  return (
    <div className='settingContainer'>
        <div className='settingIntro'>
          <h1>Color change</h1>
          <h2>change this <span style={{color:`rgb(${muscleAPIcolor})`}}>color</span> using the color bar benieth, changes will be applied through the entire site.</h2>
        </div>
        <input
        id='colorChangeInput'
        type='color'
        formAction='RGB'
        value={colord('rgb('+muscleAPIcolor+')').toHex()}
        onChange={e=>{
            let rgb=colord(e.target.value).toRgbString()
            setMuscleAPIcolor(rgb.slice(4,-1))
        }}
        />
    </div>
  )
}

export default EditSecondaryColor