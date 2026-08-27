import React from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import "./reveal.css";

const Reveal = ({
  eyebrow = "",
  heading = "THE SEASON 2 REVEAL",
  description = (
    <>
      We're keeping the details behind the next chapter
      intentionally limited. Registered participants will be
      the first to discover what's coming, how the journey
      will work, what they will experience, how you can
      be part of it and when Season 2 officially begins.
    </>
  ),
  buttonLabel = "REGISTER NOW",
  bottomText = "Be among the first to receive the Season 2 reveal.",
  onRegister,
}) => {
  return (
    <section className="season-reveal-section">

      {/* Top divider */}
      <div
        className="season-reveal-divider"
        aria-hidden="true"
      />

      <Container className="season-reveal-container">

        <motion.div
          className="season-reveal-content"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >

          {/* Eyebrow */}
          <motion.p
            className="season-reveal-eyebrow"
            variants={{
              hidden: {
                opacity: 0,
                y: 18,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {eyebrow}
          </motion.p>


          {/* Lock Icon */}
          <motion.div
            className="season-reveal-lock"
            aria-hidden="true"
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.75,
                y: -10,
              },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <svg
              viewBox="0 0 48 48"
              fill="none"
            >
              {/* Lock shackle */}
              <path
                d="M15 21V14.5C15 9.8 18.8 6 23.5 6h1C29.2 6 33 9.8 33 14.5V21"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Lock body */}
              <rect
                x="10"
                y="19"
                width="28"
                height="23"
                rx="3"
                fill="currentColor"
              />

              {/* Keyhole */}
              <circle
                cx="24"
                cy="28"
                r="2.5"
                fill="#17191c"
              />

              <path
                d="M24 30.5V35"
                stroke="#17191c"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>


          {/* Heading */}
          <motion.h2
            className="season-reveal-heading"
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {heading}
          </motion.h2>


          {/* Heading underline */}
          <motion.span
            className="season-reveal-heading-line"
            aria-hidden="true"
            variants={{
              hidden: {
                opacity: 0,
                scaleX: 0,
              },
              visible: {
                opacity: 1,
                scaleX: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          />


          {/* Description */}
          <motion.p
            className="season-reveal-description"
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {description}
          </motion.p>


          {/* Register button */}
          <motion.button
            type="button"
            className="season-reveal-button"
            onClick={onRegister}
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <span>{buttonLabel}</span>

            <span
              className="season-reveal-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </motion.button>


          {/* Bottom message */}
          <motion.p
            className="season-reveal-bottom-text"
            variants={{
              hidden: {
                opacity: 0,
                y: 15,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {bottomText}
          </motion.p>

        </motion.div>

      </Container>
    </section>
  );
};

export default Reveal;