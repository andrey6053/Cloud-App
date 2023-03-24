import React, { useState } from 'react'
import './registration.scss'
import Input from '../UI/input/Input'
import { registration } from '../../actions/user'

function Registration() {
   const [name, setName] = useState("")
   const [surnname, setSurnname] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   return (
      <div className='formReg'>
         <div className="formReg__header">Регистрация</div>
         <Input value={name} setValue={setName} type="text" placeholder="Введите имя..." />
         <Input value={surnname} setValue={setSurnname} type="text" placeholder="Введите фамилию..." />
         <Input value={email} setValue={setEmail} type="email" placeholder="Введите адрес электронной почты..." />
         <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..." />
         <button className='formReg__btn' onClick={() => registration(name, surnname, email, password)}>Зарегистрироваться</button>
      </div>
   )
}


export default Registration
