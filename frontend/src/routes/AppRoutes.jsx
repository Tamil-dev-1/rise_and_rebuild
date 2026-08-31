import React from 'react'
import Home from '../pages/Home'
import RegistrationForm from '../pages/register/RegistrationForm'
import { Routes, Route } from 'react-router-dom'
import Membership from '../pages/membership/Membership'
import ProtectRoute from '../components/protectRoutes/ProtectRoute'
import CreateAccount from '../pages/createAccount/CreateAccount'
import Login from '../pages/login/Login'
import ForgotPassword from '../pages/auth/ForgotPwd/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPwd/ResetPassword'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path='/membership' element={ 

          <ProtectRoute>
          <Membership />
          </ProtectRoute>} 
          />

          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/login' element={< Login/>} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={< ResetPassword/>} />
      </Routes>
    </div>
  )
}

export default AppRoutes
