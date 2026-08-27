import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

/* ---- Small inline icon set (no extra icon-library dependency) ---- */
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" strokeLinecap="round" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="9" cy="8" r="3" />
    <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" />
    <circle cx="17" cy="8" r="2.4" />
    <path d="M17 12.2c2.6.6 4 2.4 4 4.8" strokeLinecap="round" />
  </svg>
);

const CommunityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="7" r="3" />
    <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round" />
    <path d="M3 21c.4-2.4 1.6-4.3 3.4-5.5M21 21c-.4-2.4-1.6-4.3-3.4-5.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PortraitPlaceholderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);

const STATS = [
  { icon: <CalendarIcon />, value: '12', label: 'Series Completed' },
  { icon: <PeopleIcon />, value: '150+', label: 'Regular Participants' },
  { icon: <CommunityIcon />, value: '', label: 'A Growing Community' },
];

export default function HeroSection({ imageSrc }) {
  return (
    <section className="rr-hero">
      <div className="rr-hero__grid">
        {/* -------- Left column: content -------- */}
        <div className="rr-hero__content order-1">
          <p className="rr-hero__eyebrow">Welcome to the Journey</p>

          <h1 className="rr-hero__title">
            Rise &amp; Rebuild
            <span className="rr-hero__title-sub">Season 2</span>
          </h1>

          <p className="rr-hero__tagline">
            From Inspiration to <em>Transformation</em>.
          </p>

          <p className="rr-hero__desc">
            A powerful monthly journey designed to help you pause, reflect,
            rebuild and take meaningful action in your personal and
            professional life.
          </p>

          <div className="rr-hero__stats">
            {STATS.map((stat) => (
              <div className="rr-stat" key={stat.label}>
                <span className="rr-stat__icon">{stat.icon}</span>
                <span>
                  {stat.value && <span className="rr-stat__value">{stat.value}</span>}
                  <span className="rr-stat__label" style={{ display: 'block' }}>
                    {stat.label}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="rr-hero__cta-wrap">
            <Link to="/register" className="rr-hero__cta">
              Register Now
              <ArrowIcon />
            </Link>
            <span className="rr-hero__cta-note">
              Be the first to know when Season 2 opens.
            </span>
          </div>
        </div>

        {/* -------- Right column: image + quote -------- */}
        <div className="rr-hero__visual order-2">
          <div className="rr-hero__image-frame">
            {imageSrc ? (
              <img src={imageSrc} alt="Rise & Rebuild Season 2 host" />
            ) : (
              <div className="rr-hero__image-placeholder">
                <PortraitPlaceholderIcon />
              </div>
            )}
          </div>
          <span className="rr-hero__frame-accent" aria-hidden="true" />

          <blockquote className="rr-hero__quote">
            <span className="rr-hero__quote-mark" aria-hidden="true">&#8220;</span>
            <p className="rr-hero__quote-text">
              The most powerful project you'll ever work on <strong>is you.</strong>
            </p>
            <cite className="rr-hero__quote-author">Ponsana David</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
