import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../../../ThemeContext";
import "./dashboardHeader.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHeader({
  userName = "Tamil",
  subtitle = "You're building your next version. Keep showing up!",
  notificationCount = 0,
  avatarInitial,
  onMenuClick,
}) {
  const { theme, toggleTheme } = useTheme();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);

  const greeting = getGreeting();
  const initial = avatarInitial || userName.charAt(0).toUpperCase();

  useEffect(() => {
    if (mobileSearchOpen) searchInputRef.current?.focus();
  }, [mobileSearchOpen]);

  useEffect(() => {
    function onClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div className="app-header-left">
        <button
          className="app-header-menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={20} strokeWidth={2.2} />
        </button>

        <div className="app-header-greeting">
          <h1>
            {greeting}, {userName}!{" "}
            <span className="app-header-wave" aria-hidden="true">
              👋
            </span>
          </h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="app-header-right">
        <div
          className={`app-header-search ${
            mobileSearchOpen ? "app-header-search-open" : ""
          }`}
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search anything..."
            onBlur={() => setMobileSearchOpen(false)}
          />
          <Search size={16} strokeWidth={2.2} className="app-header-search-icon" />
        </div>

        <button
          className="app-header-search-toggle"
          onClick={() => setMobileSearchOpen((v) => !v)}
          aria-label="Search"
        >
          <Search size={18} strokeWidth={2.2} />
        </button>

        <button
          className="app-header-icon-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <span className="app-header-theme-icon">
            {theme === "dark" ? (
              <Sun size={17} strokeWidth={2.2} />
            ) : (
              <Moon size={17} strokeWidth={2.2} />
            )}
          </span>
        </button>

        <button className="app-header-icon-btn" aria-label="Notifications">
          <Bell size={17} strokeWidth={2.2} />
          {notificationCount > 0 && (
            <span className="app-header-badge">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        <div className="app-header-profile" ref={profileRef}>
          <button
            className="app-header-profile-btn"
            onClick={() => setProfileOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            <span className="app-header-avatar">{initial}</span>
            <ChevronDown
              size={15}
              strokeWidth={2.4}
              className={`app-header-chevron ${
                profileOpen ? "app-header-chevron-open" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="app-header-profile-menu" role="menu">
              <a href="/dashboard/profile" role="menuitem">
                View profile
              </a>
              <a href="/dashboard/membership" role="menuitem">
                Membership
              </a>
              <button role="menuitem">Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
