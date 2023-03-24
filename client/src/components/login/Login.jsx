import React, { useState } from 'react'
import './login.scss'
import PropTypes from 'prop-types'
import Input from '../UI/input/Input'
import { login } from '../../actions/user'
import { useDispatch } from "react-redux"

function Login(props) {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const dispatch = useDispatch()
   return (
      <div className='login'>
         <div className="login__header">Авторизация</div>
         <Input value={email} setValue={setEmail} type="email" placeholder="Введите адрес электронной почты..." />
         <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..." />
         <button onClick={() => dispatch(login(email, password))} className='login__btn'>Войти</button>
      </div>
   )
}

Login.propTypes = {}

export default Login
