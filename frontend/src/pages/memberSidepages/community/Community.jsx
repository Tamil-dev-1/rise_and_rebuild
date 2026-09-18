import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Users,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import "./Community.css";

// ---- Data Config ----
const communityBannerData = {
  category: "COMMUNITY EXCLUSIVE",
  title: "Private Member Community",
  description:
    "Join discussions, share experiences and be part of a supportive community.",
  memberCount: "150+ Members",
  bgImage:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
};

const highlightsData = [
  {
    id: "topic-1",
    tag: "Today's Topic",
    title: "What are you working on?",
    description: "Share your progress and get support from fellow creators.",
    btnText: "Join Discussion",
    icon: MessageSquare,
    themeClass: "topic-card-amber",
  },
  {
    id: "topic-2",
    tag: "Recent Discussion",
    title: "Small wins, Big changes!",
    description: "What's your biggest win this week? Let's celebrate together.",
    btnText: "View Discussion",
    icon: Sparkles,
    themeClass: "topic-card-blue",
  },
];

export default function Community() {
  const [joined, setJoined] = useState(false);
  const [activeToast, setActiveToast] = useState(null);

  const showToast = (message) => {
    setActiveToast(message);
    setTimeout(() => {
      setActiveToast(null);
    }, 3000);
  };

  const handleJoinCommunity = () => {
    setJoined(!joined);
    showToast(
      !joined
        ? "Welcome to the Private Member Community! 🎉"
        : "You left the community."
    );
  };

  return (
    <div className="community-page">
      {/* Toast Notification */}
      {activeToast && (
        <div className="toast-notification">
          <CheckCircle2 size={18} />
          <span>{activeToast}</span>
        </div>
      )}

      <Container fluid className="community-container">
        {/* Header (Without Search, Profile, or Notification icons) */}
        <div className="community-header mb-4">
          <h1 className="community-title">Community</h1>
          <p className="community-subtitle">Connect. Share. Grow. Together.</p>
        </div>

        {/* Top Hero Banner */}
        <div className="hero-banner-card mb-4">
          <div
            className="hero-banner-bg"
            style={{ backgroundImage: `url('${communityBannerData.bgImage}')` }}
          />
          <div className="hero-banner-overlay" />

          <div className="hero-banner-content">
            <div className="badge-row mb-2">
              <span className="exclusive-badge">
                <ShieldCheck size={14} />
                {communityBannerData.category}
              </span>
            </div>

            <h2 className="hero-banner-title">{communityBannerData.title}</h2>
            <p className="hero-banner-desc">
              {communityBannerData.description}
            </p>

            <div className="hero-banner-footer">
              <div className="members-pill">
                <Users size={16} />
                <span>{communityBannerData.memberCount}</span>
              </div>

              <Button
                className={`join-hero-btn ${joined ? "joined" : ""}`}
                onClick={handleJoinCommunity}
              >
                <span>{joined ? "Joined Community" : "Join Community"}</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Community Highlights Section */}
        <div className="highlights-section">
          <div className="section-header mb-3">
            <h3 className="section-title">Community Highlights</h3>
            <button
              className="view-all-btn"
              onClick={() => showToast("Viewing all discussions...")}
            >
              View All
            </button>
          </div>

          <Row className="g-3 g-md-4">
            {highlightsData.map((item) => {
              const IconComponent = item.icon;
              return (
                <Col xs={12} md={6} key={item.id}>
                  <div className={`highlight-card ${item.themeClass}`}>
                    <div className="card-top">
                      <div className="icon-badge">
                        <IconComponent size={20} />
                      </div>
                      <div className="card-meta">
                        <span className="card-tag">{item.tag}</span>
                        <h4 className="card-topic-title">{item.title}</h4>
                      </div>
                    </div>

                    <p className="card-topic-desc">{item.description}</p>

                    <Button
                      className="discussion-btn"
                      onClick={() =>
                        showToast(`Opened: ${item.title}`)
                      }
                    >
                      <span>{item.btnText}</span>
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </div>
  );
}