import React from 'react'
import AddEmployee from '../components/AddEmployee'
import Sidebar from '../components/Sidebar'

const Create = () => {
  return (
    <div className='flex flex-row min-h-screen space-x-6'>
    <div className=''>
        <Sidebar/>
    </div>
    <div className='flex-1 p-4 overflow-x-auto' >
      <AddEmployee/>
    </div>
  </div>
  )
}

export default Create