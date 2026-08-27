import React from "react";
import "./seasonTrans.css";

const SeasonTrans = () => {
  return (
    <section className="season-section" id="journey">
      <div className="season-card-wrapper">

        {/* Section Header */}
        <div className="season-top-header">
          <span className="gold-text"></span>
          <span className="black-text"> SEASON 1</span>
          <span className="arrow-text"> → </span>
          <span className="black-text">SEASON 2</span>
        </div>

        {/* Cards */}
        <div className="season-cards">

          {/* ================= SEASON 1 ================= */}
          <div className="season-box">

            <h3 className="season-title">
              SEASON 1
            </h3>

            <div className="season-content">

              {/* Group Icon */}
              <div className="season-icon-wrapper">
                <svg
                  viewBox="0 0 100 100"
                  className="season-icon season-one-icon"
                >
                  {/* Heart */}
                  <path
                    d="M50 18 C48 14,44 14,43 17
                       C42 14,38 14,36 17
                       C34 20,43 27,43 27
                       C43 27,52 20,50 18 Z"
                  />

                  {/* Center Person */}
                  <circle cx="50" cy="38" r="10" />
                  <path d="M34 68 C34 52,66 52,66 68 Z" />

                  {/* Left Person */}
                  <circle cx="28" cy="42" r="8" />
                  <path d="M15 68 C15 56,41 56,41 68 Z" />

                  {/* Right Person */}
                  <circle cx="72" cy="42" r="8" />
                  <path d="M59 68 C59 56,85 56,85 68 Z" />
                </svg>
              </div>

              {/* Text */}
              <div className="season-list-text">
                <p>We came together.</p>
                <p>We listened.</p>
                <p>We reflected.</p>
                <p>We shared.</p>
                <p>We were inspired.</p>
              </div>

            </div>
          </div>


          {/* ================= ARROW ================= */}
          <div className="transition-arrow-container">
            <div className="arrow-circle">

              <svg
                viewBox="0 0 24 24"
                className="transition-arrow"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>

            </div>
          </div>


          {/* ================= SEASON 2 ================= */}
          <div className="season-box">

            <h3 className="season-title">
              SEASON 2
            </h3>

            <h4 className="season-subtitle">
              WE GO DEEPER.
            </h4>

            <div className="season-content">

              {/* Mountain Icon */}
              <div className="season-icon-wrapper">

                <svg
                  viewBox="0 0 100 100"
                  className="season-icon"
                >

                  {/* Flag Pole */}
                  <line
                    x1="50"
                    y1="15"
                    x2="50"
                    y2="55"
                  />

                  {/* Flag */}
                  <path
                    d="M50 18 L72 25 L50 34 Z"
                    className="flag"
                  />

                  {/* Main Mountain */}
                  <polygon
                    points="50,38 20,80 80,80"
                    className="mountain"
                  />

                  {/* Mountain Highlight */}
                  <path
                    d="M40 52 L50 45 L60 52 L50 80 Z"
                    className="mountain-highlight"
                  />

                  {/* Small Peak */}
                  <polygon
                    points="25,58 5,80 45,80"
                    className="mountain-small"
                  />

                </svg>

              </div>

              {/* Description */}
              <p className="season-description">
                A new chapter is being designed for people who
                are ready to move beyond inspiration and take
                meaningful action.
              </p>

            </div>

          </div>

        </div>


        {/* Footer */}
        <div className="season-footer-text">
          <p>
            <strong>What exactly is coming?</strong>{" "}
            You'll find out after you register.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SeasonTrans;