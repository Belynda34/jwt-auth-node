import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from './Table';

const Display = () => {

  const navigate = useNavigate();
  const [username,setUsername] = useState('Loading...')

  const handleLogout = () => {
      localStorage.removeItem("token");
      navigate('/login')
  }


  const fetchUserProfile = async () =>{
      try {
        const token = localStorage.getItem('token')

        if(!token){
          console.log("No token found");
          return;
        }
        const response = await axios.get("http://localhost:4000/api/users/current",{
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type':'application/json'
         }
        })
        setUsername(response.data.username)
        console.log(response.data)
      }catch(error){
          console.log("Error fetching user data:",error)
      }
  }

  useEffect(()=>{
    fetchUserProfile()
  },[])

  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-2xl text-cyan-700 text-center p-6'>Welcome Back To Our Library</h1>
        <h1 className='text-2xl text-cyan-700 text-center p-6' >Hello there 👋🏾,{username}</h1>
        <div>
        <Table/>
        </div>
        <button className='w-32 h-12 bg-cyan-700 text-white rounded-lg text-lg font-semibold' onClick={handleLogout}>Log out</button>
        
    </div>
  )
}

export default Display