import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from './Table';
import Sidebar from './Sidebar';

const Display = () => {

  const navigate = useNavigate();
  

  const handleLogout = () => {
      localStorage.removeItem("token");
      navigate('/login')
  }


 

  return (
    <div className='flex flex-row min-h-screen space-x-6'>
      <div className=''>
        <Sidebar/>
      </div>
      <div className='flex-1 p-4 overflow-x-auto' >
        <Table/>
      </div>
    </div>
  )
}

export default Display


{/* <h1 className='text-2xl text-cyan-700 text-center p-6'>Welcome Back To Our Library</h1>
<h1 className='text-2xl text-cyan-700 text-center p-6' >Hello there 👋🏾,{username}</h1>
<div>
<Table/>
</div>
<button className='w-32 h-12 bg-cyan-700 text-white rounded-lg text-lg font-semibold' onClick={handleLogout}>Log out</button> */}
