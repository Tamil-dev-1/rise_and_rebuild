import React from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import "./bigQuestions.css";

const BigQuestion = ({
  eyebrow = "THE BIG QUESTION",

  heading = (
    <>
      WHAT IF THIS IS YOUR
      <br />
      YEAR TO REBUILD?
    </>
  ),

  points = [
    "Your confidence.",
    "Your discipline.",
    "Your direction.",
    "Your decisions.",
    "Your relationships.",
    "Your ambitions.",
    "Your next chapter.",
  ],

  closingText = "SEASON 2 IS COMING.",
}) => {
  return (
    <section className="big-question-section">

      {/* Top divider */}
      <div
        className="big-question-divider"
        aria-hidden="true"
      />

      <Container className="big-question-container">

        <div className="big-question-content">

          {/* Eyebrow */}
          <motion.p
            className="big-question-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {eyebrow}
          </motion.p>


          {/* Main Heading */}
          <motion.h2
            className="big-question-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.75,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {heading}
          </motion.h2>


          {/* Points */}
          <motion.ul
            className="big-question-list"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {points.map((point, index) => (
              <motion.li
                className="big-question-item"
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -20,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                <span
                  className="big-question-icon"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M9 12.3L11.2 14.5L15.5 9.8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span className="big-question-text">
                  {point}
                </span>
              </motion.li>
            ))}
          </motion.ul>


          {/* Closing statement */}
          <motion.p
            className="big-question-closing"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {closingText}
          </motion.p>

        </div>

      </Container>
    </section>
  );
};

export default BigQuestion;