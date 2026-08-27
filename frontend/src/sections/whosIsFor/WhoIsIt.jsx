import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./whoIsIt.css";

const WhoIsIt = ({
  eyebrow = "WHO IS RISE & REBUILD FOR?",

  heading = (
    <>
      FOR PEOPLE WHO KNOW
      <br />
      THEY ARE CAPABLE OF MORE.
    </>
  ),

  points = [
    "You are standing at a crossroads.",
    "You want to make a change.",
    "You feel you've outgrown an old version of yourself.",
    "You want greater clarity.",
    "You want to build confidence.",
    "You want to become more disciplined.",
    "You want to grow personally or professionally.",
    "You feel it is time for something different.",
  ],

  closingLines = [
    "You don't need to have everything figured out.",
    "You only need to be willing to begin.",
  ],
}) => {
  return (
    <section className="audience-fit-section">
      <Container className="audience-fit-container">
        <div className="audience-fit-content">

          {/* Eyebrow */}
          <motion.p
            className="audience-fit-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {eyebrow}
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="audience-fit-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            {heading}
          </motion.h2>

          {/* Points Grid */}
          <motion.div
            className="audience-fit-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {points.map((point, index) => (
              <motion.div
                className="audience-fit-item"
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                <svg
                  className="audience-fit-check"
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

                <span>{point}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing Statement */}
          <motion.div
            className="audience-fit-closing"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            {closingLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default WhoIsIt;