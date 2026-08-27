import React from "react";
import { Button, Container } from "react-bootstrap";
import "./seasonTeaser.css";
import { Link } from "react-router-dom";

const SeasonTeaser = ({
  eyebrow = " SEASON 2 TEASER",
  heading = (
    <>
      SEASON 2 WILL ASK YOU
      <br />
      DIFFERENT QUESTIONS.
    </>
  ),
  questions = [
    "What if the person you want to become requires you to change the person you are today?",
    "What if the biggest thing holding you back isn't your circumstances?",
    "What if rebuilding isn't about starting over?",
    "What if it's about becoming intentional?",
  ],
  ctaPrompt = "ARE YOU READY?",
  ctaLabel = "REGISTER NOW",
  onCtaClick,
}) => {
  return (
    <section className="season-teaser-section">
      <Container className="season-teaser-container">
        <div className="season-teaser-content">
          <p className="season-teaser-eyebrow">{eyebrow}</p>

          <h2 className="season-teaser-heading">{heading}</h2>

          <div className="season-teaser-grid">
            {questions.map((q, i) => (
              <div className="season-teaser-item" key={i}>
                <svg
                  className="season-teaser-check"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />

                  <path
                    d="M7.5 12.5l2.7 2.7 6.3-6.4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>{q}</span>
              </div>
            ))}
          </div>

          <Link
          
          to="/register"
            type="button"
            className="season-teaser-cta"
            onClick={onCtaClick}
          >
            <span>{ctaPrompt}</span>
            <span className="season-teaser-arrow" aria-hidden="true">
              &rarr;
            </span>
            <span>{ctaLabel}</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default SeasonTeaser;