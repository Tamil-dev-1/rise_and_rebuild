import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import DashboardHeader from "../dashboardHeader/DashboardHeader";

import "./dashboardLayout.css";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="dashboard-main">

        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}