import { useContext, useEffect, useMemo, useState } from 'react'
import DataContext from '../context/DataContext'
import {BsCheckLg ,BsXLg} from 'react-icons/bs'
const NewProfileData = () => {
    const {getAllUsers ,users ,user ,activityTypes ,editUserRefs ,calculations}=useContext(DataContext)
    const {userName ,userBio ,userPhoto ,userAge ,userHeight ,userWeight ,userGender ,userActivityLevel}=user
    const [nameInput ,setNameInput]=useState('')
    const [isValidName ,setIsValidName]=useState(true)
    const validNameCheck=useMemo(()=>{
        const allNames=[]
        users.map(user=>allNames.push(user.userName))
        if(allNames.includes(nameInput) || !nameInput.length || nameInput.length>15){
            setIsValidName(false)
            return
        }
        setIsValidName(true)
    },[nameInput])
    useEffect(()=>{
        const inputs=document.querySelectorAll('.editUserInputs')
        inputs.forEach(input=>{
            editUserRefs[`${input.dataset.content}`]=input
        })
        if(!users.length) getAllUsers()
    },[])
    return (
    <form id='editUserForm'>
        <div id='priorirtyOne'>
            {/* on drop = func */}
            <img src={userPhoto}/>
            <div className='inputContainer' id='nameInputContainer'>
                <label>name: </label>
                <input
                style={{color:isValidName ? 'green' : 'red'}}
                className='editUserInputs'
                type='text'
                placeholder={userName}
                data-content='userName'
                value={nameInput}
                onChange={(e)=>{
                    setNameInput(e.target.value.trim())
                }}
                />
                {isValidName ? <BsCheckLg style={{color:'green'}}/> : <BsXLg style={{color:'red'}}/>}
            </div>
            <div className='inputContainer'>
                <label>bio: </label>
                <input
                className='editUserInputs'
                type='text'
                placeholder={userBio}
                data-content='userBio'
                />
            </div>
        </div>
        <div id='priorirtyTwo'>
            <p>Accurate information is crucial for calculating your <span title={calculations.BMR.long} style={{color:'var(--color4)',cursor:'pointer'}}>{calculations.BMR.short}</span> ,<span title={calculations.BMI.long} style={{color:'var(--color4)',cursor:'pointer'}}>{calculations.BMI.short}</span> and <span title={calculations.TDEE.long} style={{color:'var(--color4)',cursor:'pointer'}}>{calculations.TDEE.short}</span> and achieving your fitness goals. Please provide valid information for accurate calculations. Thank you.</p>
            <div id='inputsContainer'>
                <div className='inputContainer'>
                    <label>age: </label>
                    <input
                    className='editUserInputs'
                    type='text'
                    placeholder={userAge}
                    data-content='userAge'
                    />
                </div>
                <div className='inputContainer'>
                    <label>height: </label>
                    <input
                    className='editUserInputs'
                    type='text'
                    placeholder={userHeight}
                    data-content='userHeight'
                    />
                </div>
                <div className='inputContainer'>
                    <label>weight: </label>
                    <input
                    className='editUserInputs'
                    type='text'
                    placeholder={userWeight}
                    data-content='userWeight'
                    />
                </div>
                <div className='inputContainer'>
                    <label>gender: </label>
                    <input
                    list='genders'
                    className='editUserInputs'
                    type='text'
                    placeholder={userGender}
                    data-content='userGender'
                    />
                    <datalist id='genders'>
                        <option value="male"/>
                        <option value="female"/>
                        <option value="walmart bag"/>
                    </datalist>
                </div>
            </div>
            <div id='activityLevelContainer'>
                <select id="activityLevelOptions"
                    className='editUserInputs'
                    data-content='userActivityLevel'
                >
                <option value="">choose</option>
                {Object.values(activityTypes).map(activity=>{
                    return(
                        <option
                        key={activity.label}
                        title={activity.description}
                        value={activity.label}
                        >{activity.label}
                        </option>
                    )
                })}
                </select>
            </div>
        </div>
    </form>
  )
}

export default NewProfileData