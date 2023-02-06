import { colord } from 'colord'

const Settings = () => {
  return (
    <main>
        settings
        {/*
        --change muscle color
        <div className='setting'>
            <input
            type='color'
            formAction='RGB'
            value={colord('rgb('+muscleAPIcolor+')').toHex()}
            onChange={e=>{
                let rgb=colord(e.target.value).toRgbString()
                setMuscleAPIcolor(rgb.slice(4,-1))
            }}
            />
        </div> */}
    </main>
  )
}

export default Settings