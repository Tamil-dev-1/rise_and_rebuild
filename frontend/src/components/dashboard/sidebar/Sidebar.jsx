import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlayCircle,
  Map,
  Target,
  Users,
  CreditCard,
  UserRound,
  Award,
  Flame,
  MoreVertical,
  X,
} from "lucide-react";
import "./sidebar.css";
import Logo from "../../../assets/images/logo/logo.png";
import DemoImg from "../../../assets/images/dashboard/demo.jpg"

const menuItems = [
  { label: "Dashboard", path: "/dashboard", Icon: LayoutDashboard },
  { label: "Sessions", path: "/dashboard/sessions", Icon: PlayCircle },
  { label: "Journey", path: "/dashboard/journey", Icon: Map },
  { label: "Challenges", path: "/dashboard/challenges", Icon: Target },
  { label: "Community", path: "/dashboard/community", Icon: Users },
  { label: "My Membership", path: "/dashboard/membership", Icon: CreditCard },
  { label: "Profile", path: "/dashboard/profile", Icon: UserRound },
  { label: "Certificates", path: "/dashboard/certificates", Icon: Award },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="dashboard-sidebar-overlay" onClick={onClose} />}

      <aside className={`dashboard-sidebar ${isOpen ? "dashboard-sidebar-open" : ""}`}>
        <button className="dashboard-sidebar-close" onClick={onClose} aria-label="Close menu">
          <X size={16} strokeWidth={2.5} />
        </button>


        {/* Logo */}
        <div className="dashboard-brand">
          <div className="dashboard-brand-mark">
            <img
              src={Logo}
              alt="Rise & Rebuild Logo"
              className="dashboard-logo-image"
            />
          </div>

          <div className="dashboard-brand-text">
            <h2>Rise &amp; Rebuild</h2>
            <span>Season 2</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="dashboard-nav">
          {menuItems.map(({ label, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/dashboard"}
              onClick={onClose}
              className={({ isActive }) =>
                `dashboard-nav-item ${isActive ? "dashboard-nav-active" : ""}`
              }
            >
              <span className="dashboard-nav-icon">
                <Icon size={17} strokeWidth={2.1} />
              </span>
              <span className="dashboard-nav-label">{label}</span>
              <span className="dashboard-nav-tooltip">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Photo quote panel */}
        <div className="dashboard-quote">
          <img
            src={DemoImg}
            alt="Rise & Rebuild inspiration"
            className="dashboard-quote-image"
          />

          <div className="dashboard-quote-scrim" />

          <div className="dashboard-quote-content">
            <span className="dashboard-quote-mark">&ldquo;</span>

            <p>
              The next version
              <br />
              of you is built
              <br />
              one step at a time.
            </p>

            <strong>Keep going!</strong>
          </div>
        </div>

        {/* User */}
        <div className="dashboard-user">
          <div className="dashboard-user-avatar">T</div>
          <div className="dashboard-user-info">
            <strong>Tamil</strong>
            <span>Member</span>
          </div>
          <button className="dashboard-user-menu" aria-label="Account options">
            <MoreVertical size={16} strokeWidth={2.2} />
          </button>
        </div>
      </aside>
    </>
  );
}
