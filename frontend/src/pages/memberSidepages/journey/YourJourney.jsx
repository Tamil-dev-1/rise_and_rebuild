import React from "react";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import "./YourJourney.css";

const months = [
  {
    id: "01",
    title: "The Reset",
    status: "completed",
    media:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "02",
    title: "Discipline",
    status: "completed",
    media:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "03",
    title: "Money",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "04",
    title: "Confidence",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "05",
    title: "Communication",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "06",
    title: "Failure",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "07",
    title: "Relationships",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "08",
    title: "Leadership",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "09",
    title: "Digital Life",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "10",
    title: "Purpose",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "11",
    title: "Your Next Version",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "12",
    title: "Rise",
    status: "upcoming",
    media:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  },
];

const totalCompleted = months.filter(
  (month) => month.status === "completed"
).length;

const totalMonths = months.length;

const progressPercent = Math.round(
  (totalCompleted / totalMonths) * 100
);

function StatusBadge({ status }) {
  if (status === "completed") {
    return (
      <span className="journey-status journey-status-completed">
        <FaCheckCircle />
        Completed
      </span>
    );
  }

  return (
    <span className="journey-status journey-status-upcoming">
      <FaLock />
      Upcoming
    </span>
  );
}

function JourneyCard({ month }) {
  return (
    <div className="journey-card">
      {/* Background Image */}
      <img
        src={month.media}
        alt={month.title}
        className="journey-card-image"
      />

      {/* Dark Overlay */}
      <div className="journey-card-overlay"></div>

      {/* Card Content */}
      <div className="journey-card-content">

        {/* Top */}
        <div className="journey-card-top">
          <span className="journey-number">
            {month.id}
          </span>

          {month.status === "completed" ? (
            <FaCheckCircle className="journey-check-icon" />
          ) : (
            <FaLock className="journey-lock-icon" />
          )}
        </div>

        {/* Bottom */}
        <div className="journey-card-bottom">
          <h3>{month.title}</h3>

          <StatusBadge status={month.status} />
        </div>

      </div>
    </div>
  );
}

export default function YourJourney() {
  return (
    <div className="journey-page">

      <div className="journey-container">

        {/* =========================
            HEADER
        ========================== */}
        <div className="journey-header">

          <div>
            <h1 className="journey-title">
              Your Journey
            </h1>

            <p className="journey-subtitle">
              12 months, 12 transformations, one better version of you.
            </p>
          </div>

        </div>


        {/* =========================
            PROGRESS
        ========================== */}
        <div className="journey-progress-section">

          <div className="journey-progress-top">

            <span className="journey-progress-text">
              {totalCompleted} / {totalMonths} Completed
            </span>

            <span className="journey-progress-percent">
              {progressPercent}%
            </span>

          </div>

          <div className="journey-progress-track">
            <div
              className="journey-progress-fill"
              style={{
                width: `${progressPercent}%`,
              }}
            ></div>
          </div>

        </div>


        {/* =========================
            JOURNEY GRID
        ========================== */}
        <div className="journey-grid">

          {months.map((month) => (
            <JourneyCard
              key={month.id}
              month={month}
            />
          ))}

        </div>

      </div>

    </div>
  );
}