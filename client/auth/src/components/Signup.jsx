import React from 'react'

const Signup = () => {
  return (

    <div className='bg-gray-100 min-h-screen flex justify-center items-center'>
        <div className='bg-white w-[34rem] h-[36rem] rounded-lg p-8'>
            <div>
                <h1 className='text-3xl text-cyan-700 font-bold text-center'>Sign Up</h1>
            </div>
            <div>
                <div>
                    <input className='outline-none w-full h-[50px] bg-gray-100 rounded-lg focus:border-2 focus:bg-white focus:border-gray-300'/>
                </div>
            </div>
        </div>
    </div>
   
  )
}

export default Signup