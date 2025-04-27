import React from 'react'
import { useNavigate } from 'react-router-dom';

const Display = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("token");
      navigate('/login')
  }

  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-2xl text-cyan-700 text-center p-6'>Welcome Back To Our Library</h1>
        <button className='w-32 h-12 bg-cyan-700 text-white rounded-lg text-lg font-semibold' onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default Display