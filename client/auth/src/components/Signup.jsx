import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {toast,ToastContainer} from "react-toastify"
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";


const Signup = () => {


    const [passwordVisible,setPasswordVisible] = useState(false)
    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:4000/api/auth/register",{
                username,email,password
            });
            // localStorage.setItem("token",response.data.token)
            toast.success(response.data.message || "Signup successful")
            navigate("/login")
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed")
        }
    }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <ToastContainer/>
      <div className="bg-white w-[28rem] h-[32rem] rounded-lg p-8 space-y-10">
        <div>
          <h1 className="text-3xl text-cyan-700 font-bold text-center pt-7">
            Sign Up
          </h1>
        </div>
        <div>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <input
                name="username"
                type="text"
                required
                className="outline-none w-full h-[50px] bg-gray-100 rounded-lg focus:border-2 focus:bg-white focus:border-gray-300 pl-4 font-semibold"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                required
                className="outline-none w-full h-[50px] bg-gray-100 rounded-lg focus:border-2 focus:bg-white focus:border-gray-300 pl-4 font-semibold"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                required
                className="outline-none w-full h-[50px] bg-gray-100 rounded-lg focus:border-2 focus:bg-white focus:border-gray-300 pl-4 font-semibold"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordVisible ? (<IoEyeOff className="text-xl text-gray-600 absolute right-4 top-1/2 transform -translate-y-1/2" onClick={() => setPasswordVisible((prev) => !prev)}/>) :(<IoEye className="text-xl text-gray-600 absolute right-4 top-1/2 transform -translate-y-1/2 " onClick={() => setPasswordVisible((prev) => !prev)}/>)}
            </div>
            <div>
              <button type="submit" className="w-full h-[50px] bg-cyan-700  rounded-lg text-lg font-semibold text-white" >Sign Up</button>
            </div>
            <div className="text-center">
                <section className="text-lg font-medium">Already have an account?{" "}<Link className="underline underline-offset-2 text-cyan-700" to={"/login"}>Login</Link></section>
            </div>
            
          </form>
        </div>
      </div>
    
    </div>
  );
};

export default Signup;
