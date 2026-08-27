import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./story.css";
// import speakerImage from "./assets/speaker-hero.png";

/**
 * StorySection
 * A two-column "story" block: light text panel on the left with a
 * curved edge that bleeds into a full-bleed photo on the right.
 *
 * Usage:
 *   <StorySection />
 *   <StorySection imageSrc={myImage} imageAlt="Speaker on stage" />
 */
const Story = ({
  eyebrow = "THE STORY",
  heading = (
    <>
      IT STARTED WITH
      <br />
      A SIMPLE IDEA.
    </>
  ),
  imageSrc = '',
  imageAlt = "Speaker addressing a full auditorium",
}) => {
  return (
    <section id="about" className="story-section">
      {/* Hidden SVG clip-path definition: draws the "C" curve on the
          panel's right edge. objectBoundingBox units (0–1) make it
          scale automatically with the panel's rendered size, so the
          same curve holds its shape at every breakpoint. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="storyPanelCurve" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L0.926,0 C0.85,0.18 0.85,0.55 0.90,0.72 C0.93,0.85 0.96,0.93 1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <Container fluid className="p-0">
        <Row className="g-0 story-row">
          <Col xs={12} className="story-stage-col">
            <div className="story-stage">
              {/* Full-bleed photo, spans the whole stage */}
              <div
                className="story-image"
                style={{ backgroundImage: `url(${imageSrc})` }}
                role="img"
                aria-label={imageAlt}
              />

              {/* Text panel, clipped with the "C" curve, sits above the photo */}
              <div className="story-panel">
                <div className="story-panel-inner">
                  <p className="story-eyebrow">{eyebrow}</p>

                  <h2 className="story-heading">{heading}</h2>
                  <span className="story-rule" aria-hidden="true" />

                  <p className="story-text">
                    What if we created a space where people could stop for a
                    moment, look at where they are, question what needs to
                    change and find the courage to move forward?
                  </p>

                  <p className="story-text">
                    That idea became <strong>Rise &amp; Rebuild</strong>.
                  </p>

                  <p className="story-text">
                    Over the past year, 12 series have been completed,
                    bringing together a growing community of regular
                    participants.
                  </p>

                  <p className="story-closing">
                    What started as a session has become a journey.
                    <br />
                    And now, the journey continues.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Story;
