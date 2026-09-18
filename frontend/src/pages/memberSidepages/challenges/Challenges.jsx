import React, { useState } from "react";
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";
import {
  CalendarCheck,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap,
  Flame,
  Award,
  BookOpen,
} from "lucide-react";
import "./Challenges.css";

// ---- Mock Data ----
const initialChallenge = {
  id: "current-1",
  title: "30-Day Reset Challenge",
  subtitle: "Build consistency through one small action every day.",
  tag: "#easyrepeat",
  image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
  daysDone: 18,
  totalDays: 30,
};

const previousChallengesData = [
  {
    id: 1,
    title: "Reset Challenge",
    days: "30 Days",
    completed: true,
    progress: "30 / 30 Days",
    badgeColor: "bg-emerald-light",
    iconColor: "text-emerald",
    icon: CheckCircle2,
  },
  {
    id: 2,
    title: "Discipline Challenge",
    days: "30 Days",
    completed: true,
    progress: "30 / 30 Days",
    badgeColor: "bg-purple-light",
    iconColor: "text-purple",
    icon: Zap,
  },
  {
    id: 3,
    title: "Money Challenge",
    days: "18 / 30 Days",
    completed: false,
    progress: "18 / 30 Days",
    badgeColor: "bg-blue-light",
    iconColor: "text-blue",
    icon: Flame,
  },
];

export default function Challenges() {
  const [challenge, setChallenge] = useState(initialChallenge);

  const progressPercent = Math.round(
    (challenge.daysDone / challenge.totalDays) * 100
  );

  const handleContinue = () => {
    if (challenge.daysDone < challenge.totalDays) {
      setChallenge((prev) => ({
        ...prev,
        daysDone: prev.daysDone + 1,
      }));
    }
  };

  const daysLeft = challenge.totalDays - challenge.daysDone;

  const stats = [
    {
      icon: CalendarCheck,
      value: challenge.daysDone,
      label: "Days Done",
      colorClass: "stat-icon-emerald",
    },
    {
      icon: Target,
      value: daysLeft,
      label: "Days Left",
      colorClass: "stat-icon-amber",
    },
    {
      icon: TrendingUp,
      value: `${progressPercent}%`,
      label: "Progress",
      colorClass: "stat-icon-blue",
    },
  ];

  return (
    <div className="challenges-page">
      <Container fluid className="challenges-container">
        {/* Header */}
        <div className="challenges-header">
          <div>
            <h1 className="challenges-title">Challenges</h1>
            <p className="challenges-subtitle">
              Turn what you learn into action.
            </p>
          </div>
        </div>

        {/* Current Challenge Card */}
        <div className="current-challenge-card mb-4">
          <div
            className="current-challenge-bg"
            style={{ backgroundImage: `url('${challenge.image}')` }}
          />
          <div className="current-challenge-overlay" />

          <div className="current-challenge-content">
            <div className="current-badge-wrap">
              <span className="current-badge">
                <span className="dot" /> CURRENT CHALLENGE
              </span>
            </div>

            <h2 className="current-challenge-title">{challenge.title}</h2>
            <p className="current-challenge-desc">{challenge.subtitle}</p>
            <p className="current-challenge-tag">{challenge.tag}</p>

            <div className="current-challenge-footer">
              <div className="progress-section">
                <div className="progress-bar-container">
                  <div className="progress-pill">
                    <ProgressBar
                      now={progressPercent}
                      className="current-progressbar"
                    />
                    <span className="progress-percent-badge">
                      {progressPercent}%
                    </span>
                  </div>
                </div>
                <div className="progress-days-text">
                  <strong>{challenge.daysDone}</strong> / {challenge.totalDays} days
                </div>
              </div>

              <Button className="continue-btn" onClick={handleContinue}>
                <span>Continue Challenge</span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <Row className="g-3 g-md-4 mb-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Col xs={12} sm={4} key={idx}>
                <div className="stat-card">
                  <div className={`stat-icon-wrap ${stat.colorClass}`}>
                    <Icon size={22} />
                  </div>
                  <div className="stat-text">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Previous Challenges Section */}
        <div className="previous-section">
          <h3 className="previous-title">Previous Challenges</h3>

          <div className="previous-list">
            {previousChallengesData.map((item) => {
              const Icon = item.icon;
              return (
                <div className="previous-item" key={item.id}>
                  <div className="previous-item-left">
                    <div className={`previous-icon-wrap ${item.badgeColor}`}>
                      <Icon size={18} className={item.iconColor} />
                    </div>
                    <span className="previous-item-title">{item.title}</span>
                  </div>
                  <div className="previous-item-right">
                    <span className="previous-item-days">{item.days}</span>
                    <div className="chevron-wrap">
                      <ArrowRight size={16} className="previous-arrow" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}