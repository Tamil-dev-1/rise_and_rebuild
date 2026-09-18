import React, { useState } from "react";
import { Container, Nav, Button } from "react-bootstrap";
import { Calendar, Clock, Play, Info, BookOpen } from "lucide-react";
import "./Session.css";
import heroImg from "../../../assets/images/dashboard/heroImg.png";

/* ==========================================================================
   Data — edit these to change what's shown.
   `image` defaults to heroImg; pass a different import per item if you
   have separate thumbnails for each episode.
   ========================================================================== */
const UPCOMING = [
  { id: "ep04", episode: "Episode 04", title: "CONFIDENCE", date: "13 Sep 2026", time: "7:00 PM IST", image: heroImg },
];

const PAST = [
  { id: "ep03", episode: "Episode 03", title: "MONEY", date: "04 Aug 2026", time: "7:00 PM IST", image: heroImg },
  { id: "ep02", episode: "Episode 02", title: "DISCIPLINE", date: "28 Jul 2026", time: "7:00 PM IST", image: heroImg },
  { id: "ep01", episode: "Episode 01", title: "THE RESET", date: "21 Jul 2026", time: "7:00 PM IST", image: heroImg },
];

/* ==========================================================================
   Sub-pieces (kept in this same file, as requested)
   ========================================================================== */
function Header() {
  return (
    <div className="sessions-header">
      <h1 className="sessions-title">Sessions</h1>
      <p className="sessions-subtitle">
        Live sessions, replays and resources to help you grow.
      </p>
    </div>
  );
}

function HeroSession({
  badge = "LIVE SOON",
  episode = "Episode 04",
  title = "CONFIDENCE",
  date = "12 Sep 2026",
  time = "7:00 PM IST",
  image,
  onJoin,
  onViewDetails,
}) {
  return (
    <div className="hero-session" style={image ? { backgroundImage: `url(${image})` } : undefined}>
      <div className="hero-session__overlay">
        <span className="hero-badge">
          <span className="hero-badge__dot" />
          {badge}
        </span>

        <div className="hero-session__body">
          <span className="hero-episode">{episode}</span>
          <h2 className="hero-title">{title}</h2>

          <div className="hero-meta">
            <span className="hero-meta__item"><Calendar size={14} />{date}</span>
            <span className="hero-meta__item"><Clock size={14} />{time}</span>
          </div>

          <div className="hero-actions">
            <Button className="btn-join" onClick={onJoin}>
              <Play size={13} className="me-2" />
              Join Live Session
            </Button>
            <Button className="btn-details" onClick={onViewDetails}>
              <Info size={13} className="me-2" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SessionTabs({ activeKey, onSelect, upcomingCount = 1 }) {
  const tabs = [
    { key: "upcoming", label: `Upcoming Session (${upcomingCount})` },
    { key: "past", label: "Past Sessions" },
    { key: "all", label: "All" },
  ];

  return (
    <Nav className="session-tabs" activeKey={activeKey} onSelect={onSelect}>
      {tabs.map((tab) => (
        <Nav.Item key={tab.key}>
          <Nav.Link eventKey={tab.key} className="session-tab">
            {tab.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

function SessionListItem({
  episode,
  title,
  date,
  time,
  image,
  variant = "past",
  onPrimaryAction,
  onSecondaryAction,
}) {
  return (
    <div className="session-item">
      <div className="session-item__thumb" style={image ? { backgroundImage: `url(${image})` } : undefined}>
        <span className="session-item__thumb-icon"><Play size={13} /></span>
      </div>

      <div className="session-item__info">
        <span className="session-item__episode">{episode}</span>
        <h3 className="session-item__title">{title}</h3>
        <div className="session-item__meta">
          <span className="session-item__meta-item"><Calendar size={14} />{date}</span>
          <span className="session-item__meta-dot">&middot;</span>
          <span className="session-item__meta-item"><Clock size={14} />{time}</span>
        </div>
      </div>

      <div className="session-item__actions">
        {variant === "upcoming" ? (
          <Button className="btn-join btn-join--sm" onClick={onPrimaryAction}>
            <Play size={13} className="me-2" />
            Join Live Session
          </Button>
        ) : (
          <>
            <Button className="btn-replay" onClick={onPrimaryAction}>
              <Play size={13} className="me-2" />
              Watch Replay
            </Button>
            <Button className="btn-workbook" onClick={onSecondaryAction}>
              <BookOpen size={13} className="me-2" />
              Workbook
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function UpcomingSection({ sessions = [] }) {
  return (
    <section className="sessions-section">
      <div className="sessions-section__head">
        <h4 className="sessions-section__title">Upcoming Session</h4>
        <span className="live-soon-label">Live Soon</span>
      </div>
      <div className="session-list">
        {sessions.map((s) => (
          <SessionListItem key={s.id} variant="upcoming" {...s} />
        ))}
      </div>
    </section>
  );
}

function PastSessions({ sessions = [] }) {
  return (
    <section className="sessions-section">
      <div className="sessions-section__head">
        <h4 className="sessions-section__title">Past Sessions</h4>
      </div>
      <div className="session-list">
        {sessions.map((s) => (
          <SessionListItem key={s.id} variant="past" {...s} />
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   Main export
   ========================================================================== */
export default function Session() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="sessions-page">
      <Container className="sessions-container">
        <Header />

        <HeroSession
          badge="LIVE SOON"
          episode="Episode 04"
          title="CONFIDENCE"
          date="12 Sep 2026"
          time="7:00 PM IST"
          image={heroImg}
        />

        <SessionTabs
          activeKey={activeTab}
          onSelect={setActiveTab}
          upcomingCount={UPCOMING.length}
        />

        {(activeTab === "upcoming" || activeTab === "all") && (
          <UpcomingSection sessions={UPCOMING} />
        )}

        {(activeTab === "past" || activeTab === "all") && (
          <PastSessions sessions={PAST} />
        )}
      </Container>
    </div>
  );
}
