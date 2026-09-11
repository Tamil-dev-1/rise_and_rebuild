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
import DashboardLayout from '../components/dashboard/dashboardLayout/DashboardLayout'
import Dashboard from '../pages/dashboard/Dashboard';
import Payment from "../pages/payment/Payment";
import MembershipProtectedRoute from "../components/protectRoutes/MembershipProtectedRoute"

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


           {/* MEMBER DASHBOARD */}
           <Route path='/dashboard' element={<DashboardLayout/>} >
           <Route index element={
            <MembershipProtectedRoute>
            <Dashboard />
            </MembershipProtectedRoute>} />
           </Route>

           <Route path='/payment' element={<Payment />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
