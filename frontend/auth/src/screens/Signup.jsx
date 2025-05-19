import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { IoEyeOff, IoEye } from "react-icons/io5";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post("http://localhost:4001/api/auth/register", {
        username,
        email,
        password,
      });

      toast.success(response.data.message || "Signup successful. Check your email for OTP.");
      setIsOtpSent(true);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Signup failed";
      toast.error(errorMsg);
      setErrors(error.response?.data?.errors || {});
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4001/api/auth/verify-otp", {
        email,
        otp,
      });

      toast.success(response.data.message || "OTP verified successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white w-[28rem] p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl text-cyan-700 font-bold text-center">
          {isOtpSent ? "Verify OTP" : "Sign Up"}
        </h1>

        {!isOtpSent ? (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-[50px] bg-gray-100 rounded-lg px-4 font-semibold outline-none focus:bg-white focus:border-cyan-600 focus:border"
                placeholder="Username"
                required
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[50px] bg-gray-100 rounded-lg px-4 font-semibold outline-none focus:bg-white focus:border-cyan-600 focus:border"
                placeholder="Email"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] bg-gray-100 rounded-lg px-4 font-semibold outline-none focus:bg-white focus:border-cyan-600 focus:border"
                placeholder="Password"
                required
              />
              {passwordVisible ? (
                <IoEyeOff
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              ) : (
                <IoEye
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              )}
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full h-[50px] bg-cyan-700 text-white rounded-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </button>

            <div className="text-center text-lg">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-700 underline">
                Login
              </Link>
            </div>
          </form>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleOtpVerification}>
            <div>
              <input
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full h-[50px] bg-gray-100 rounded-lg px-4 font-semibold outline-none focus:bg-white focus:border-cyan-600 focus:border"
                placeholder="Enter OTP"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-[50px] bg-cyan-700 text-white rounded-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center text-lg">
              Didn’t receive the OTP?{" "}
              <button
                type="button"
                className="text-cyan-700 underline"
                onClick={handleSubmit}
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;

































// import React, { useState } from "react";
// import {Link, useNavigate} from "react-router-dom"
// import axios from "axios"
// import {toast,ToastContainer} from "react-toastify"
// import { IoEyeOff } from "react-icons/io5";
// import { IoEye } from "react-icons/io5";


// const Signup = () => {


//     const [passwordVisible,setPasswordVisible] = useState(false)
//     const [username,setUsername] = useState();
//     const [email,setEmail] = useState();
//     const [password,setPassword] = useState();
//      const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         setErrors({})

//         try {
//             const response = await axios.post("http://localhost:4001/api/auth/register",{
//                 username,email,password
//             });
//             // localStorage.setItem("token",response.data.token)
//             toast.success(response.data.message || "Signup successful.Check your email for OTP ")
//             setIsOtpSent(true);
//             // navigate("/login")
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Signup failed")
//             setErrors(error.response?.data?.errors || {});
//         }finally{
//           setIsLoading(false);
//         }
//   }
//    const handleOtpVerification = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await axios.post("http://localhost:4001/api/auth/verify-otp", {
//         email,
//         otp,
//       });

//       toast.success(response.data.message || "OTP verified successfully");
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "OTP verification failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex justify-center items-center">
//       <ToastContainer/>
//       <div className="bg-white w-[28rem] h-[32rem] rounded-lg p-8 space-y-10">
//         <div>
//           <h1 className="text-3xl text-cyan-700 font-bold text-center pt-7">
//             Sign Up
//           </h1>
//         </div>
//         <div>
//           <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
//             <div>
//               <input
//                 name="username"
//                 type="text"
//                 required
//                 className="outline-none w-full h-[50px] bg-gray-100 rounded-lg focus:border-2 focus:bg-white focus:border-gray-300 pl-4 font-semibold"
//                 placeholder="Username"
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="outline-none w-full h-[50px] bg-gray-100 rounded-lg focus:border-2 focus:bg-white focus:border-gray-300 pl-4 font-semibold"
//                 placeholder="Email"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="relative">
//               <input
//                 name="password"
//                 type={passwordVisible ? "text" : "password"}
//                 required
//                 className="outline-none w-full h-[50px] bg-gray-100 rounded-lg focus:border-2 focus:bg-white focus:border-gray-300 pl-4 font-semibold"
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {passwordVisible ? (<IoEyeOff className="text-xl text-gray-600 absolute right-4 top-1/2 transform -translate-y-1/2" onClick={() => setPasswordVisible((prev) => !prev)}/>) :(<IoEye className="text-xl text-gray-600 absolute right-4 top-1/2 transform -translate-y-1/2 " onClick={() => setPasswordVisible((prev) => !prev)}/>)}
//             </div>
//             <div>
//               <button type="submit" className="w-full h-[50px] bg-cyan-700  rounded-lg text-lg font-semibold text-white" >Sign Up</button>
//             </div>
//             <div className="text-center">
//                 <section className="text-lg font-medium">Already have an account?{" "}<Link className="underline underline-offset-2 text-cyan-700" to={"/login"}>Login</Link></section>
//             </div>
            
//           </form>
//         </div>
//       </div>
    
//     </div>
//   );
// };

// export default Signup;
