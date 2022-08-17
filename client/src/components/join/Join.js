import React, { useState } from 'react'
import './Join.css'
import { NavLink } from 'react-router-dom'

let user

const handleButton = () => {
  user = document.getElementById('JoinInput').value
  document.getElementById('JoinInput').value = ''
}

const Join = () => {
  const [name, setName] = useState('')

  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img
          src='https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0'
          alt='logo'
        />
        <h1>Live Chat MERN</h1>
        <input
          placeholder='Enter Your Name'
          type='text'
          id='JoinInput'
          autoComplete='off'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <NavLink
          onClick={(e) => (!name ? e.preventDefault() : null)}
          to='/chat'
        >
          <button onClick={handleButton} className='JoinButton'>
            Login In
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default Join
export { user }
