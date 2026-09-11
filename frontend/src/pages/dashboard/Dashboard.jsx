import React from "react";
import {
  Crown,
  Calendar,
  BarChart3,
  Target,
  Clock,
  Video,
  CheckCircle2,
  Lock,
  Play,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  BookOpen,
  Users,
  Settings2,
  Flame,
} from "lucide-react";
import { useCountdown } from "../../hooks/useCountdown";
import "./Dashboard.css"
import HeroImg from "../../assets/images/dashboard/heroImg.png"

const HERO_BG_IMAGE = HeroImg 

const JOURNEY_IMAGES = [
  "https://images.pexels.com/photos/100077/pexels-photo-100077.jpeg",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80",
];

const STATS = [
  {
    icon: Crown,
    tone: "violet",
    label: "Membership",
    value: "Transformation Plan",
    footer: "₹999 / month",
    badge: "ACTIVE",
  },
  {
    icon: Calendar,
    tone: "gold",
    label: "Next Live Session",
    value: "Episode 04",
    big: "12",
    unit: "Days to go",
    footer: "12 Sep, 7:00 PM",
  },
  {
    icon: BarChart3,
    tone: "success",
    label: "Journey Progress",
    value: "3 / 12 Episodes",
    progress: 25,
    footer: "25% Completed",
  },
  {
    icon: Target,
    tone: "info",
    label: "Current Challenge",
    value: "30-Day Reset Challenge",
    progress: 60,
    footer: "18 / 30 Days · 60% Completed",
  },
];

const JOURNEY_STEPS = [
  { id: "01", title: "THE RESET", status: "done", img: JOURNEY_IMAGES[0] },
  { id: "02", title: "DISCIPLINE", status: "done", img: JOURNEY_IMAGES[1] },
  { id: "03", title: "MONEY", status: "current", img: JOURNEY_IMAGES[2] },
  { id: "04", title: "CONFIDENCE", status: "upcoming", img: JOURNEY_IMAGES[3] },
  { id: "05", title: "COMMUNICATION", status: "upcoming", img: JOURNEY_IMAGES[4] },
];

const PROGRESS_ROWS = [
  { icon: Users, label: "Sessions Attended", value: 3, total: 12, tone: "violet" },
  { icon: CheckCircle2, label: "Challenges Completed", value: 2, total: 12, tone: "success" },
  { icon: BookOpen, label: "Workbooks Completed", value: 3, total: 12, tone: "gold" },
];

const QUICK_ACTIONS = [
  { icon: PlayCircle, label: "Watch Latest Replay", tone: "violet" },
  { icon: BookOpen, label: "Open Workbook", tone: "success" },
  { icon: Target, label: "Continue Challenge", tone: "gold" },
  { icon: Users, label: "Community", tone: "info" },
  { icon: Settings2, label: "Manage Membership", tone: "violet" },
];

export default function Dashboard({ theme = "light" }) {
  const countdown = useCountdown("2026-09-12T19:00:00");

  return (
    <div className={`rr-dash theme-${theme}`}>
      {/* Top Stat Cards Row */}
      <section className="rr-stats">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* Hero Banner + Your Journey Row */}
      <section className="rr-row rr-row-hero">
        <div className="rr-hero">
          <img src={HERO_BG_IMAGE} alt="Hero background" className="rr-hero-bg" />
          <div className="rr-hero-scrim" />
          <div className="rr-hero-content">
            <span className="rr-hero-pill">NEXT LIVE SESSION</span>
            <span className="rr-hero-eyebrow">EPISODE 04</span>
            <h2>CONFIDENCE</h2>
            <p>Build self-belief, decision-making and presence.</p>
            <div className="rr-hero-meta">
              <span>
                <Calendar size={13} strokeWidth={2.2} /> 12 September, 2026
              </span>
              <span>
                <Clock size={13} strokeWidth={2.2} /> 7:00 PM IST
              </span>
            </div>
            <div className="rr-hero-countdown">
              <span className="rr-hero-countdown-label">Live session starts in</span>
              <div className="rr-hero-countdown-boxes">
                <CountBox value={countdown.days} label="DAYS" />
                <CountBox value={countdown.hours} label="HOURS" />
                <CountBox value={countdown.minutes} label="MINUTES" />
                <CountBox value={countdown.seconds} label="SECONDS" />
              </div>
            </div>
            <div className="rr-hero-actions">
              <button className="rr-btn rr-btn-primary">
                <Video size={15} strokeWidth={2.2} /> Join Live Session
              </button>
              <button className="rr-btn rr-btn-ghost">View Details</button>
            </div>
          </div>
        </div>

        <div className="rr-card rr-journey-card">
          <div className="rr-card-header">
            <h3>YOUR JOURNEY</h3>
            <a href="#journey" className="rr-link">View All</a>
          </div>
          <ol className="rr-journey-list">
            {JOURNEY_STEPS.map((step, i) => (
              <li
                key={step.id}
                className={`rr-journey-item rr-journey-${step.status} ${
                  i === JOURNEY_STEPS.length - 1 ? "rr-journey-item-last" : ""
                }`}
              >
                <span className="rr-journey-node">
                  {step.status === "done" ? (
                    <CheckCircle2 size={15} strokeWidth={2.4} />
                  ) : step.status === "current" ? (
                    <span className="rr-journey-dot" />
                  ) : (
                    <span className="rr-journey-num">{step.id}</span>
                  )}
                </span>
                <div className="rr-journey-text">
                  <strong className="rr-journey-title">{step.title}</strong>
                  <span className="rr-journey-sub">
                    {step.status === "done"
                      ? "Completed"
                      : step.status === "current"
                      ? "Current Episode"
                      : "Upcoming"}
                  </span>
                </div>
                {step.status !== "upcoming" && (
                  <button
                    className={
                      step.status === "current"
                        ? "rr-btn rr-btn-primary rr-btn-sm"
                        : "rr-btn rr-btn-outline rr-btn-sm"
                    }
                  >
                    {step.status === "current" ? "Continue" : "Watch Replay"}
                  </button>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Continue Your Journey + Progress Row */}
      <section className="rr-row">
        <div className="rr-card">
          <div className="rr-card-header">
            <h3>CONTINUE YOUR JOURNEY</h3>
            <a href="#journey" className="rr-link">View Full Journey</a>
          </div>
          <div className="rr-continue-grid">
            {JOURNEY_STEPS.map((step) => (
              <div
                key={step.id}
                className={`rr-continue-card ${
                  step.status === "current" ? "rr-continue-card-active" : ""
                }`}
              >
                <img src={step.img} alt={step.title} className="rr-continue-img" />
                <div className="rr-continue-scrim" />
                <span className="rr-continue-badge">
                  {step.status === "done" && <CheckCircle2 size={12} strokeWidth={2.6} />}
                  {step.status === "current" && <Play size={10} strokeWidth={2.6} fill="currentColor" />}
                  {step.status === "upcoming" && <Lock size={12} strokeWidth={2.6} />}
                </span>
                <div className="rr-continue-info">
                  <span className="rr-continue-id">{step.id}</span>
                  <strong>{step.title}</strong>
                </div>
                <div className="rr-continue-progress">
                  <div
                    className={`rr-continue-progress-fill rr-continue-progress-${step.status}`}
                    style={{
                      width:
                        step.status === "done"
                          ? "100%"
                          : step.status === "current"
                          ? "45%"
                          : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rr-card">
          <div className="rr-card-header">
            <h3>YOUR PROGRESS</h3>
            <button className="rr-dropdown-btn">
              This Month <ChevronDown size={14} strokeWidth={2.4} />
            </button>
          </div>
          <div className="rr-progress-rows">
            {PROGRESS_ROWS.map((row) => (
              <div className="rr-progress-row" key={row.label}>
                <div className="rr-progress-row-top">
                  <span className={`rr-progress-icon rr-tone-${row.tone}`}>
                    <row.icon size={15} strokeWidth={2.2} />
                  </span>
                  <span className="rr-progress-label">{row.label}</span>
                  <span className="rr-progress-value">
                    {row.value} / {row.total}
                  </span>
                </div>
                <div className="rr-progress-track">
                  <div
                    className={`rr-progress-fill rr-tone-${row.tone}`}
                    style={{ width: `${(row.value / row.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="rr-progress-row">
              <div className="rr-progress-row-top">
                <span className="rr-progress-icon rr-tone-orange">
                  <Flame size={15} strokeWidth={2.2} />
                </span>
                <span className="rr-progress-label">Current Streak</span>
                <span className="rr-progress-value">14 Days</span>
              </div>
              <div className="rr-progress-track">
                <div className="rr-progress-fill rr-tone-orange" style={{ width: "70%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions (Marquee) + Reminders Row */}
      <section className="rr-row">
        <div className="rr-card rr-marquee-card">
          <div className="rr-card-header">
            <h3>QUICK ACTIONS</h3>
          </div>
          <div className="rr-marquee-track-wrapper">
            <div className="rr-marquee-track">
              {[...QUICK_ACTIONS, ...QUICK_ACTIONS].map((a, idx) => (
                <button className="rr-quick-action" key={`${a.label}-${idx}`}>
                  <span className={`rr-quick-icon rr-tone-${a.tone}`}>
                    <a.icon size={16} strokeWidth={2.1} />
                  </span>
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rr-card">
          <div className="rr-card-header">
            <h3>UPCOMING REMINDERS</h3>
            <a href="#reminders" className="rr-link">View All</a>
          </div>
          <div className="rr-reminder">
            <span className="rr-reminder-icon">
              <Calendar size={17} strokeWidth={2.1} />
            </span>
            <div className="rr-reminder-text">
              <strong>Episode 04 – CONFIDENCE</strong>
              <span>12 September, 7:00 PM IST</span>
            </div>
            <span className="rr-reminder-pill">12 Days</span>
            <ChevronRight size={16} strokeWidth={2.2} className="rr-reminder-chevron" />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, tone, label, value, footer, badge, big, unit, progress }) {
  return (
    <div className="rr-stat-card">
      <span className={`rr-stat-icon rr-tone-${tone}`}>
        <Icon size={18} strokeWidth={2.1} />
      </span>
      <div className="rr-stat-body">
        <span className="rr-stat-label">{label}</span>
        {big ? (
          <span className="rr-stat-big">
            {big} <small>{unit}</small>
          </span>
        ) : (
          <strong className="rr-stat-value">{value}</strong>
        )}
        {progress != null && (
          <div className="rr-stat-track">
            <div className={`rr-stat-fill rr-tone-${tone}`} style={{ width: `${progress}%` }} />
          </div>
        )}
        <div className="rr-stat-footer">
          {badge && <span className="rr-stat-badge">{badge}</span>}
          {footer && <span className="rr-stat-footer-text">{footer}</span>}
        </div>
      </div>
    </div>
  );
}

function CountBox({ value, label }) {
  return (
    <div className="rr-count-box">
      <strong>{String(value || 0).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
}