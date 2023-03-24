import Navbar from "./navbar/Navbar";
import './app.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Registration from "./registration/Registration";
import Login from './login/Login'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth ?
            <Routes>
              <Route path="/registration" element={<Registration />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="*" element={<Navigate to="/login" />}></Route>
            </Routes>
            :
            <Routes>
              <Route path="/" element={<Disk />}></Route>
              <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
