import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../UI/input/Input'
import "./navbar.scss"
import Logo from '../../assets/img/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import { getFiles } from '../../actions/files'
import { showLoader } from '../../reducers/appReducer'
function Navbar() {
   const dispatch = useDispatch()
   const isAuth = useSelector(state => state.user.isAuth)
   const curDir = useSelector(state => state.files.currentDir)
   const [searchValue, setSearchValue] = useState("")
   const [searchTimeout, setSearchTimeout] = useState(false)
   function searchFiles(event) {
      setSearchValue(event)
      dispatch(showLoader())
      if (searchTimeout !== false) {
         clearTimeout(searchTimeout)
      }
      if (event !== "") {
         setSearchTimeout(setTimeout((value) => {
            dispatch(getFiles(null, value))
         }, 500, event))
      } else {
         dispatch(getFiles(curDir))
      }
   }
   return (
      <div className='nav'>
         <div className="nav__container">
            <img alt="" src={Logo} className="nav__logo"></img>
            <div className="nav__header">Cloud9</div>
            {isAuth && <div className='nav__search'><Input placeholder={"Введите название файла"} value={searchValue} setValue={searchFiles} /></div>}
            {!isAuth && <div className="nav__auth"><Link to={"/login"}>Войти</Link></div>}
            {!isAuth && <div className="nav__registration" ><Link to={"/registration"}>Регистрация</Link></div>}
            {isAuth && <div className="nav__auth logout" onClick={() => { dispatch(logout()); localStorage.removeItem("token") }}>Выход</div>}
         </div>
      </div>
   )
}


export default Navbar
