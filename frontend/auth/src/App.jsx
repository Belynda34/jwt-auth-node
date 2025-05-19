import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Display from "./screens/Display";
import "react-toastify/dist/ReactToastify.css";
import SessionWrapper from "./components/SessionWrapper";
import Create from "./screens/Create";
// import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route
            path="/signup"
            element={token ? <Navigate to={"/display"} /> : <Signup />}
          />
          <Route path="" element={<Login />} />
          <Route
            path="/login"
            element={token ? <Navigate to={"/display"} /> : <Login />}
          />
          <Route path="/create" element={
              <SessionWrapper>
                <Create/>
              </SessionWrapper>
            } />

          <Route
            path="/display"
            element={
              <SessionWrapper>
                <Display />
              </SessionWrapper>
            }
          />
{/* 
          <Route
            path="/create"
            element={
              <ProtectedRoutes role={userRole} allowedRoles={["admin"]}>
                <SessionWrapper>
                  <Create />
                </SessionWrapper>
              </ProtectedRoutes>
            } */}
          {/* /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
