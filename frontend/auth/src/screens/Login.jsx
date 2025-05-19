import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { IoEye,IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [passwordVisible,setPasswordVisible] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.accessToken);

      toast.success(response.data.message || "Login Successfully");

      navigate("/display");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white w-[28rem] h-[30rem] rounded-lg p-8 space-y-10">
        <div>
          <h1 className="text-3xl text-cyan-700 font-bold text-center pt-7">
            Login
          </h1>
        </div>
        <div>
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
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
              <button
                className="w-full h-[50px] bg-cyan-700 rounded-lg text-lg font-semibold text-white"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <section className="text-lg font-medium">
                Don't have an account?{" "}
                <Link className="text-cyan-700" to={"/signup"}>
                  SignUp
                </Link>
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
