import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Display from './components/Display'
import "react-toastify/dist/ReactToastify.css"; 
import SessionWrapper from './components/SessionWrapper'


function App() {

  const token = localStorage.getItem("token")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={token ? <Navigate to={"/display"}/> : <Signup/>}/>
          <Route path='' element={<Login/>}/>
          <Route path="/login" element={token ? <Navigate to={"/display"}/> : <Login/>}/>
          <Route path="/display" element={
            <SessionWrapper>
                <Display/>
            </SessionWrapper>
            
            }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
