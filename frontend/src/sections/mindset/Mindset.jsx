import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./mindset.css";

/* =========================================================
   PREMIUM ICONS
   ========================================================= */

const IconPause = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle
      cx="24"
      cy="24"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M20 18v12M28 18v12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconReflect = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle
      cx="24"
      cy="24"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M17 24c0-4.4 3.6-8 8-8 2.5 0 4.7 1.1 6.2 3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M31 17v5h-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M31 24c0 4.4-3.6 8-8 8-2.5 0-4.7-1.1-6.2-3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M17 31v-5h5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconRebuild = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle
      cx="24"
      cy="24"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M16 28l5-5 4 4 7-8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M28 19h4v4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconRise = () => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle
      cx="24"
      cy="24"
      r="18"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M24 33V15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <path
      d="M17 22l7-7 7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M17 33h14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);


/* =========================================================
   DEFAULT STEPS
   ========================================================= */

const defaultSteps = [
  {
    number: "01",
    title: "PAUSE",
    description: "Understand where you are.",
    icon: <IconPause />,
  },
  {
    number: "02",
    title: "REFLECT",
    description: "Understand what needs to change.",
    icon: <IconReflect />,
  },
  {
    number: "03",
    title: "REBUILD",
    description: "Create a new direction.",
    icon: <IconRebuild />,
  },
  {
    number: "04",
    title: "RISE",
    description: "Become the person you are capable of becoming.",
    icon: <IconRise />,
  },
];


/* =========================================================
   COMPONENT
   ========================================================= */

const Mindset = ({
  eyebrow = "THE RISE & REBUILD MINDSET",
  steps = defaultSteps,
}) => {
  return (
    <section className="mindset-section">
      <Container className="mindset-container">

        {/* Header */}

        <motion.div
          className="mindset-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <p className="mindset-eyebrow">
            {eyebrow}
          </p>

          <div className="mindset-header-line" />
        </motion.div>


        {/* Timeline */}

        <motion.div
          className="mindset-timeline"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >

          {steps.map((step, index) => (
            <motion.div
              className="mindset-step"
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 35,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.65,
                    ease: "easeOut",
                  },
                },
              }}
            >

              {/* Number */}

              <span className="mindset-number">
                {step.number}
              </span>


              {/* Icon + Connector */}

              <div className="mindset-icon-wrapper">

                <div className="mindset-icon">
                  {step.icon}
                </div>

                {index < steps.length - 1 && (
                  <span
                    className="mindset-connector"
                    aria-hidden="true"
                  />
                )}

              </div>


              {/* Content */}

              <div className="mindset-copy">

                <h3 className="mindset-title">
                  {step.title}
                </h3>

                <p className="mindset-description">
                  {step.description}
                </p>

              </div>

            </motion.div>
          ))}

        </motion.div>

      </Container>
    </section>
  );
};

export default Mindset;