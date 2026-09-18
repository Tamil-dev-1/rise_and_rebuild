import React from "react";
import Home from "../pages/Home";
import RegistrationForm from "../pages/register/RegistrationForm";
import { Routes, Route } from "react-router-dom";

import Membership from "../pages/membership/Membership";
import ProtectRoute from "../components/protectRoutes/ProtectRoute";
import CreateAccount from "../pages/createAccount/CreateAccount";
import Login from "../pages/login/Login";

import ForgotPassword from "../pages/auth/ForgotPwd/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPwd/ResetPassword";

import DashboardLayout from "../components/dashboard/dashboardLayout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";

import Payment from "../pages/payment/Payment";

import MembershipProtectedRoute from "../components/protectRoutes/MembershipProtectedRoute";

import Session from "../pages/memberSidepages/session/Sessions";
import YourJourney from "../pages/memberSidepages/journey/YourJourney";
import Challenges from "../pages/memberSidepages/challenges/Challenges";
import Community from "../pages/memberSidepages/community/Community";
import MyMembership from "../pages/memberSidepages/membership/MyMembership";
import Profile from "../pages/memberSidepages/profile/Profile";
import Certificate from "../pages/memberSidepages/certificate/Certificate";


const AppRoutes = () => {
  return (
    <div>
      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={<RegistrationForm />}
        />

        <Route
          path="/membership"
          element={
            <ProtectRoute>
              <Membership />
            </ProtectRoute>
          }
        />

        <Route
          path="/create-account"
          element={<CreateAccount />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />


        {/* =========================
            MEMBER DASHBOARD
        ========================== */}

        <Route
          path="/dashboard"
          element={
            <MembershipProtectedRoute>
              <DashboardLayout />
            </MembershipProtectedRoute>
          }
        >

          {/* Dashboard */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* Sessions */}
          <Route
            path="sessions"
            element={<Session />}
          />

          {/* Journey */}
          <Route
            path="journey"
            element={<YourJourney />}
          />
           
           //Challenges
           <Route
            path="challenges"
            element={<Challenges />}
          />

        //Community
          <Route
            path="community"
            element={<Community />}
          />

           //Membership
          <Route
            path="membership"
            element={<MyMembership />}
          />

          //Profile page
          <Route
            path="profile"
            element={<Profile />}
          />

             //Certificate
          <Route
            path="certificates"
            element={<Certificate />}
          />

        </Route>


        {/* =========================
            PAYMENT
        ========================== */}

        <Route
          path="/payment"
          element={<Payment />}
        />

      </Routes>
    </div>
  );
};

export default AppRoutes;