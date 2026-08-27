import React from 'react'
import Home from '../pages/Home'
import RegistrationForm from '../pages/register/RegistrationForm'
import { Routes, Route } from 'react-router-dom'
import Membership from '../pages/membership/Membership'
import ProtectRoute from '../components/protectRoutes/ProtectRoute'

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
      </Routes>
    </div>
  )
}

export default AppRoutes
